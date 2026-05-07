import { useEffect, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'

import { router } from 'expo-router'

import { supabase } from '../../src/services/supabase'

export default function HomeScreen() {
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    checkUser()
    fetchProfile()
  }, [])

  const checkUser = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      router.replace('/login')
    }
  }

  const fetchProfile = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (error) {
      alert(error.message)
    } else {
      setProfile(data)
    }
  }

  const logout = async () => {
    await supabase.auth.signOut()

    router.replace('/login')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Welcome to SkillMap 🚀
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>First Name</Text>

        <Text style={styles.value}>
          {profile?.first_name || 'N/A'}
        </Text>

        <Text style={styles.label}>Last Name</Text>

        <Text style={styles.value}>
          {profile?.last_name || 'N/A'}
        </Text>

        <Text style={styles.label}>Email</Text>

        <Text style={styles.value}>
          {profile?.email || 'N/A'}
        </Text>

        <Text style={styles.label}>Phone</Text>

        <Text style={styles.value}>
          {profile?.phone || 'N/A'}
        </Text>

        <Text style={styles.label}>Birth Date</Text>

        <Text style={styles.value}>
          {profile?.birth_date || 'N/A'}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={logout}
      >
        <Text style={styles.buttonText}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    padding: 24,
    justifyContent: 'center',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 30,
    textAlign: 'center',
  },

  card: {
    backgroundColor: '#1E293B',
    borderRadius: 20,
    padding: 24,
    marginBottom: 30,
  },

  label: {
    color: '#94A3B8',
    marginTop: 12,
    fontSize: 14,
  },

  value: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },

  button: {
    backgroundColor: '#4983F6',
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
})