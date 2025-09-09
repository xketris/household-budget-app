import { useState } from "react";
import { Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";

const CustomChart = () => {
  
  const pieData = [
    {
      id: 0,
      value: 47,
      name: "Health",
      color: "#009FFF",
      gradientCenterColor: "#006DFF",
      focused: true,
    },
    {
      id: 1,
      value: 40,
      name: "Food",
      color: "#93FCF8",
      gradientCenterColor: "#3BE9DE",
    },
    {
      id: 2,
      value: 16,
      name: "Car",
      color: "#BDB2FA",
      gradientCenterColor: "#5b43f4ff",
    },
    {
      id: 3,
      value: 3,
      name: "House",
      color: "#FFA5BA",
      gradientCenterColor: "#fa3b5eff",
    },
  ];

  const [data, setData] = useState(pieData);

  const [selected, setSelected] = useState(data[0]);

  const renderDot = (color: string) => {
    return (
      <View className="size-3 rounded-md mr-3" style={{ backgroundColor: color}}
      />
    );
  };

  const renderLegendComponent = () => {
    return (
      <>
        <View className="flex-row justify-center flex-wrap gap-2">
          {data.map((category) => (
            <View
              className="flex-row items-center justify-center w-2/5"
              key={category.id}
            >
              <View>{renderDot(category.color)}</View>
              <Text className="text-foreground">
                {category.name}: {category.value}%
              </Text>
            </View>
          ))}
        </View>
      </>
    );
  };

  return (
    <View
        style={{
          margin: 20,
          padding: 16,
          borderRadius: 20,
          backgroundColor: "#141b43ff",
        }}
      >
        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
          Statistics
        </Text>
        <View style={{ padding: 20, alignItems: "center" }}>
          <PieChart
            data={data}
            donut
            showGradient
            sectionAutoFocus
            radius={90}
            innerRadius={60}
            innerCircleColor={"#232B5D"}
            onPress = { (item:any, index:any) => {
                const newData = data.map(dataItem => ({...dataItem, focused: dataItem===item}));
                setSelected(newData[index]); 
                setData([...newData]);
            } }
            centerLabelComponent={() => {
              return (
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Text
                    style={{ fontSize: 22, color: "white", fontWeight: "bold" }}
                  >
                    {selected.value}%
                  </Text>
                  <Text style={{ fontSize: 14, color: "white" }}>
                    {selected.name}
                  </Text>
                </View>
              );
            }}
          />
        </View>
        {renderLegendComponent()}
      </View>
  );
};

export default CustomChart;
