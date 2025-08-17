import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, useRouter } from 'expo-router'
import CustomInput from '@/components/CustomInput'
import { current } from '@/service/auth'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/state/store'
import useAuth from '@/hooks/useAuth'
import { load } from '@/state/user/userSlice'

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  const { signIn } = useAuth();

  const dispatch = useDispatch<AppDispatch>();
  const { user, accessToken, newUser } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    (async() => {
      console.log("AAA\n")
      try {
        const res = await current();
        if(res.data) {
          dispatch(load(res.data));
        }
        console.log("DATA", res.data)
      } catch (err) {
        console.log(err);
      }
    })()
  }, [])

  const handleLogin = async () => {
    setError(false);
    try {
      const res = await signIn({email, password});
      console.log(res?.data)
    } catch(err) {
      console.log("ERR")
      setError(true);
    }
  }

  return (
    <View className='bg-background flex-1 h-full w-full flex-col justify-center items-center px-16'>
        <Text className='text-foreground text-5xl font-bold pb-12'>Welcome Back</Text>
        <View className='flex-col w-full justify-around gap-5 pb-5'>
            { error && <Text className='text-foreground text-2xl font-bold'>An Error Occurred</Text> }
            <CustomInput placeholder="Email" className="rounded-3xl" value={email} onChangeText={(newEmail: string) => setEmail(newEmail)} />
            <CustomInput placeholder="Password" className="rounded-3xl" value={password} secureTextEntry onChangeText={(newPassword: string) => setPassword(newPassword)}  />
            <TouchableOpacity className='bg-primary w-full py-5 rounded-3xl' onPress={handleLogin}>
                <Text className='text-background font-bold text-center text-2xl'>Login</Text>
            </TouchableOpacity>
        </View>
        <TouchableOpacity className='flex-row gap-2' onPress={() => router.replace("/auth/register") }>
            <Text className='text-secondary text-center text-2xl'>Don&apos;t have an account?</Text>
            <Text className='text-primary text-center text-2xl font-bold'>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity className='flex-row gap-2'>
            <Text className='text-white text-center text-2xl'>{accessToken}</Text>
        </TouchableOpacity>

    </View>
  )
}

export default LoginPage