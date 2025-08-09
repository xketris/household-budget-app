// MonthYearScrollPicker.tsx
import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ListRenderItemInfo,
} from 'react-native';

type Value = { month: number; year: number };

type Props = {
  value?: Value;                         // month: 1-12
  onChange?: (next: Value) => void;
  minYear?: number;
  maxYear?: number;
  locale?: string;                       // e.g., 'en-US'
  monthFormat?: 'short' | 'long' | 'number';
  visibleRows?: number;                  // odd; default 5
  itemHeight?: number;                   // default 44
  style?: any;
  textStyle?: any;                       // base text style for items
  selectedTextStyle?: any;               // style for the centered item
  separatorColor?: string;               // center highlight borders
  monthColumnWidth?: number;             // default 120
  yearColumnWidth?: number;              // default 100
};

const DEFAULT_ITEM_H = 44;
const DEFAULT_VISIBLE_ROWS = 5;
const PAD_TOKEN = '__pad__';

const MonthYearScrollPicker: React.FC<Props> = ({
  value,
  onChange,
  minYear,
  maxYear,
  locale,
  monthFormat = 'short',
  visibleRows = DEFAULT_VISIBLE_ROWS,
  itemHeight = DEFAULT_ITEM_H,
  style,
  textStyle,
  selectedTextStyle,
  separatorColor = '#D1D5DB',
  monthColumnWidth = 120,
  yearColumnWidth = 100,
}) => {
  const now = useMemo(() => new Date(), []);
  const currentYear = now.getFullYear();
  const yearMin = minYear ?? currentYear - 50;
  const yearMax = maxYear ?? currentYear + 10;
   // Refs
  const monthRef = useRef<FlatList<string>>(null);
  const yearRef = useRef<FlatList<string>>(null);

  const [sel, setSel] = useState<Value>({
    month: value?.month ?? now.getMonth() + 1,
    year: value?.year ?? currentYear,
  });

  const months = useMemo(() => Array.from({ length: 12 }, (_, i) => i + 1), []);
  const years = useMemo(
    () => Array.from({ length: yearMax - yearMin + 1 }, (_, i) => yearMin + i),
    [yearMin, yearMax]
  );

  // Formatter
  const monthLabel = useCallback(
    (m: number) => {
      if (monthFormat === 'number') return String(m);
      const d = new Date(2000, m - 1, 1);
      const fmt = new Intl.DateTimeFormat(locale, {
        month: monthFormat === 'long' ? 'long' : 'short',
      });
      return fmt.format(d);
    },
    [locale, monthFormat]
  );

 

  // Ensure visibleRows is odd and compute padding rows
  const oddVisible = visibleRows % 2 === 1 ? visibleRows : visibleRows + 1;
  const pad = Math.floor(oddVisible / 2);

  const paddedMonths = useMemo(
    () => [
      ...Array(pad).fill(PAD_TOKEN),
      ...months.map(m => monthLabel(m)),
      ...Array(pad).fill(PAD_TOKEN),
    ],
    [months, pad, monthLabel]
  );

  const paddedYears = useMemo(
    () => [
      ...Array(pad).fill(PAD_TOKEN),
      ...years.map(y => String(y)),
      ...Array(pad).fill(PAD_TOKEN),
    ],
    [years, pad]
  );

  const getCenteredIndex = (offsetY: number) => {
    const rawIndex = Math.round(offsetY / itemHeight);
    return Math.max(0, rawIndex - pad);
  };

  const clampIndex = (i: number, len: number) => Math.min(Math.max(i, 0), len - 1);

  const updateSelection = (next: Partial<Value>) => {
    const merged = { ...sel, ...next };
    setSel(merged);
    onChange?.(merged);
  };

  // Named renderers (no anonymous JSX), fix display-name rule
  const renderPaddedRow: React.FC<{ label: string; width: number }> = ({ label, width }) => {
    const isPad = label === PAD_TOKEN;
    return (
      <View style={{ height: itemHeight, width, justifyContent: 'center', alignItems: 'center' }}>
        {isPad ? null : <Text style={[styles.itemText, textStyle]}>{label}</Text>}
      </View>
    );
  };
  renderPaddedRow.displayName = 'RenderPaddedRow';

  const renderMonthItem = ({ item }: ListRenderItemInfo<string>) => {
    return <RenderPaddedRow label={item} width={monthColumnWidth} />;
  };
  renderMonthItem.displayName = 'RenderMonthItem';

  const renderYearItem = ({ item }: ListRenderItemInfo<string>) => {
    return <RenderPaddedRow label={item} width={yearColumnWidth} />;
  };
  renderYearItem.displayName = 'RenderYearItem';

  // alias for JSX capitalization
  const RenderPaddedRow = renderPaddedRow;

  const onMonthMomentumEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const idx = clampIndex(getCenteredIndex(e.nativeEvent.contentOffset.y), months.length);
    updateSelection({ month: months[idx] });
  };

  const onYearMomentumEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const idx = clampIndex(getCenteredIndex(e.nativeEvent.contentOffset.y), years.length);
    updateSelection({ year: years[idx] });
  };

  const scrollToIndex = (
    ref: React.RefObject<FlatList<string> | null>,
    dataIndex: number,
    animated = true
  ) => {
    if (!ref.current) return;
    const paddedIndex = dataIndex + pad;
    ref.current.scrollToOffset({
      offset: paddedIndex * itemHeight,
      animated,
    });
  };

  // Initial positioning
  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToIndex(monthRef, sel.month - 1, false);
      scrollToIndex(yearRef, years.indexOf(sel.year), false);
    }, 0);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync when external value changes
  useEffect(() => {
    if (!value) return;
    if (value.month !== sel.month) {
      scrollToIndex(monthRef, value.month - 1);
    }
    if (value.year !== sel.year) {
      scrollToIndex(yearRef, years.indexOf(value.year));
    }
    setSel(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value?.month, value?.year, years.length]);

  const centerTop = itemHeight * Math.floor(oddVisible / 2);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.columns}>
        {/* Months */}
        <View style={[styles.column, { width: monthColumnWidth, height: itemHeight * oddVisible }]}>
          <FlatList
            ref={monthRef}
            data={paddedMonths}
            keyExtractor={(_, i) => `m-${i}`}
            showsVerticalScrollIndicator={false}
            bounces={false}
            snapToInterval={itemHeight}
            decelerationRate="fast"
            getItemLayout={(_, i) => ({
              length: itemHeight,
              offset: itemHeight * i,
              index: i,
            })}
            onMomentumScrollEnd={onMonthMomentumEnd}
            renderItem={renderMonthItem}
          />
          <View
            pointerEvents="none"
            style={[
              styles.centerOverlay,
              {
                top: centerTop,
                height: itemHeight,
                borderColor: separatorColor,
              },
            ]}
          />
          <View
            pointerEvents="none"
            style={[
              styles.centerTextOverlay,
              { top: centerTop, height: itemHeight, width: monthColumnWidth },
            ]}
          >
          </View>
        </View>

        <View style={{ width: 12 }} />

        {/* Years */}
        <View style={[styles.column, { width: yearColumnWidth, height: itemHeight * oddVisible }]}>
          <FlatList
            ref={yearRef}
            data={paddedYears}
            keyExtractor={(_, i) => `y-${i}`}
            showsVerticalScrollIndicator={false}
            bounces={false}
            snapToInterval={itemHeight}
            decelerationRate="fast"
            getItemLayout={(_, i) => ({
              length: itemHeight,
              offset: itemHeight * i,
              index: i,
            })}
            onMomentumScrollEnd={onYearMomentumEnd}
            renderItem={renderYearItem}
          />
          <View
            pointerEvents="none"
            style={[
              styles.centerOverlay,
              {
                top: centerTop,
                height: itemHeight,
                borderColor: separatorColor,
              },
            ]}
          />
          <View
            pointerEvents="none"
            style={[
              styles.centerTextOverlay,
              { top: centerTop, height: itemHeight, width: yearColumnWidth },
            ]}
          >
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 12 },
  columns: { flexDirection: 'row', justifyContent: 'center' },
  column: {
    // width & height set inline to use props
  },
  centerOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  centerTextOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: { fontSize: 16, color: '#6B7280' },
  selectedText: { fontSize: 18, fontWeight: '600', color: '#111827' },
});

export default MonthYearScrollPicker;
