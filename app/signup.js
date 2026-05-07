import { useState } from 'react'
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'

import { LinearGradient } from 'expo-linear-gradient'

import { Ionicons } from '@expo/vector-icons'

import { router } from 'expo-router'

import { supabase } from '../src/services/supabase'

export default function SignUpScreen() {
  const [firstName, setFirstName] =
    useState('')

  const [lastName, setLastName] =
    useState('')

  const [phone, setPhone] =
    useState('')

  const [birthDate, setBirthDate] =
    useState('')

  const [email, setEmail] =
    useState('')

  const [password, setPassword] =
    useState('')

  const signUp = async () => {
    const { data, error } =
      await supabase.auth.signUp({
        email,
        password,
      })

    if (error) {
      alert(error.message)
      return
    }

    await supabase.from('profiles').insert({
      id: data.user.id,
      first_name: firstName,
      last_name: lastName,
      phone,
      birth_date: birthDate,
      email,
    })

    router.replace("/(tabs)")
  }

  return (
    <LinearGradient
      colors={['#020617', '#111827', '#0F172A']}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={styles.container}
      >
        <View style={styles.logoContainer}>
          <Ionicons
            name="map"
            size={60}
            color="#60A5FA"
          />

          <Text style={styles.logoText}>
            SkillMap
          </Text>

          <Text style={styles.subtitle}>
            Chart Your Success
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>
            Create Account
          </Text>

          <TextInput
            placeholder="First Name"
            placeholderTextColor="#94A3B8"
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
          />

          <TextInput
            placeholder="Last Name"
            placeholderTextColor="#94A3B8"
            style={styles.input}
            value={lastName}
            onChangeText={setLastName}
          />

          <TextInput
            placeholder="Phone"
            placeholderTextColor="#94A3B8"
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
          />

          <TextInput
            placeholder="Birth Date"
            placeholderTextColor="#94A3B8"
            style={styles.input}
            value={birthDate}
            onChangeText={setBirthDate}
          />

          <TextInput
            placeholder="Email"
            placeholderTextColor="#94A3B8"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            placeholder="Password"
            placeholderTextColor="#94A3B8"
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            onPress={signUp}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#3B82F6', '#8B5CF6']}
              style={styles.button}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.buttonText}>
                Sign Up
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              router.replace('/login')
            }
          >
            <Text style={styles.login}>
              Already have an account? Login
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingBottom: 50,
  },

  logoContainer: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 40,
  },

  logoText: {
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
    marginTop: 10,
  },

  subtitle: {
    color: '#94A3B8',
    marginTop: 6,
    fontSize: 16,
  },

  card: {
    backgroundColor: 'rgba(30,41,59,0.95)',
    borderRadius: 28,
    padding: 28,
  },

  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 28,
  },

  input: {
    backgroundColor: '#0F172A',
    borderRadius: 18,
    paddingHorizontal: 18,
    height: 62,
    color: 'white',
    fontSize: 16,
    marginBottom: 18,
  },

  button: {
    padding: 18,
    borderRadius: 18,
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
  },

  login: {
    color: '#CBD5E1',
    textAlign: 'center',
    marginTop: 28,
    fontSize: 15,
  },
})