import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";


export default function CollapsibleView({ title, children })
{
  const [open, setOpen] = useState(true);

  return (
    <View>
      <TouchableOpacity onPress={() => setOpen(!open)}>
        <Text>{title} {open ? "▲" : "▼"}</Text>
      </TouchableOpacity>

      {open && 
        <View>
            {children}
        </View>}
    </View>
  );
}

