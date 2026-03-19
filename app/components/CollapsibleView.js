import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";


export default function CollapsibleView({ title, children })
{
  const [open, setOpen] = useState(true);

  return (
    <View style={styles.container}>
      {open && 
        <View style={styles.body}>
            {children}
        </View>}

      <TouchableOpacity style={styles.header} onPress={() => setOpen(!open)}>
        <Text>{title} {open ? "▲" : "▼"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#0000009e",
    marginBottom: 8,
    overflow: "hidden",
    width: "90%",
    alignSelf: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    borderTopWidth: 2,
    borderColor: "#0000009e",
  },
  body: {
    borderTopWidth: 0.5,
    borderTopColor: "#000000)",
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 6,
  },
});

