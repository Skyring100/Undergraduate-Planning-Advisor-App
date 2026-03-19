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
        <Text style= {{color: '#a7a7a7'}}>{title} {open ? "close ▲ filter" : "open ▼ filter"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#6f6f6f',
    backgroundColor: '#4b4b4b',
    marginTop: 5,
    overflow: 'hidden',
    width: '100%',
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1.5,
    borderColor: '#6f6f6f',
    backgroundColor: '#2b2b2b',
  },
  body: {
    borderTopWidth: 0.5,
    borderTopColor: '6f6f6f',
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 6,
  },
});

