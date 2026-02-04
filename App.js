import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Image, ScrollView, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

const ADMIN = {
  user: "Deni008",
  pass: "12345678",
};

export default function App() {
  const [login, setLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const [name, setName] = useState("");
  const [records, setRecords] = useState([]);

  const handleLogin = () => {
    if (user === ADMIN.user && pass === ADMIN.pass) {
      setLogin(true);
      setIsAdmin(true);
    } else {
      Alert.alert("Login gagal", "Username / Password salah");
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      const data = {
        name,
        photo: result.assets[0].uri,
        time: new Date().toLocaleString(),
      };

      setRecords([...records, data]);
      setName("");
    }
  };

  // LOGIN SCREEN
  if (!login) {
    return (
      <View style={styles.login}>
        <Text style={styles.title}>ONOM FIGHTER</Text>

        <TextInput
          placeholder="Username"
          style={styles.input}
          onChangeText={setUser}
        />

        <TextInput
          placeholder="Password"
          secureTextEntry
          style={styles.input}
          onChangeText={setPass}
        />

        <Button title="Login" onPress={handleLogin} />
      </View>
    );
  }

  // MAIN APP
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>📋 Absensi ONOM FIGHTER</Text>

      <TextInput
        placeholder="Nama Atlet"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <Button title="Absen + Foto" onPress={pickImage} />

      <Text style={styles.sub}>📊 Data Kehadiran</Text>

      {records.map((item, i) => (
        <View key={i} style={styles.card}>
          <Image source={{ uri: item.photo }} style={styles.img} />
          <View>
            <Text>{item.name}</Text>
            <Text style={styles.time}>{item.time}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 40 },
  login: { flex: 1, justifyContent: "center", padding: 30 },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },

  sub: {
    fontSize: 18,
    marginVertical: 15,
  },

  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },

  card: {
    flexDirection: "row",
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
  },

  img: {
    width: 60,
    height: 60,
    marginRight: 10,
  },

  time: {
    fontSize: 12,
    color: "gray",
  },
});
