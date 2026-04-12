import { FlatList, Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Checkbox } from "expo-checkbox";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type todoType = {
  id: number;
  title: string;
  isDone: boolean;
}

export default function Index() {

  const todos = [
    { id: 1, title: "Buy Shit", isDone: false },
    { id: 2, title: "Tender meat", isDone: false },
    { id: 3, title: "Go mountain climbing", isDone: false },
    { id: 4, title: "Kill a white bear", isDone: true },
    { id: 5, title: "Tear Paper", isDone: false },
    { id: 6, title: "Buy Yellow Soap", isDone: false },
  ];

  const [task, setTask] = useState<todoType[]>([]);
  const [oldTask, setOldTask] = useState<todoType[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");


  // To add a new task
  const addTodo = async () => {
    try {
      const newTodo = {
        id: Math.random(),
        title: newTask,
        isDone: false,
      };
      if (newTodo === null) {
        alert("Enter a valid title name");
        setNewTask("");
        Keyboard.dismiss(); //To close keyboard after adding a task
      } else {
        task.push(newTodo);
        setTask([...task]);
        setOldTask([...task]);
        await AsyncStorage.setItem("tasks", JSON.stringify(task));
        alert(`Task "${newTask}" added Successfully`);
        setNewTask("");
        Keyboard.dismiss(); //To close keyboard after adding a task
      }
      task.push(newTodo);
      setTask([...task]);
      setOldTask([...task]);
      await AsyncStorage.setItem("tasks", JSON.stringify(task));
      alert(`Task "${newTask}" added Successfully`);
      setNewTask("");
      Keyboard.dismiss(); //To close keyboard after adding a task
    } catch (error) {
      console.error("Error adding task:", error);
    }
  }

  // To Delete a task
  const deleteTodo = async (id: number) => {
    try {
      const newTodo = task.filter((t) => t.id !== id);
      await AsyncStorage.setItem("task", JSON.stringify(newTodo));
      setTask(newTodo);
      setOldTask(newTodo);
    } catch (error) {
      console.error("Error deleting Task", error);
    }
  }

  // To mark a task as done
  const handleDone = async (id: number) => {
    try {
      const newTodo = task.map((t) => {
        if (t.id === id) {
          t.isDone = !t.isDone;
        }
        return t;
      });
      await AsyncStorage.setItem("task", JSON.stringify(newTodo));
      setTask(newTodo);
      setOldTask(newTodo);
    } catch (error) {
      console.error(error);
    }
  }


  // To Search for a task
  const handleSearch = (query: string) => {
    if (query === "") {
      setTask(oldTask);
    } else {
      const filteredTasks = oldTask.filter((ot) => ot.title.toLowerCase().includes(query.toLowerCase()));
      setTask(filteredTasks);
    }
  }

  useEffect(() => { handleSearch(searchQuery) }, [searchQuery]);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem("tasks");
        if (storedTasks !== null && storedTasks !== undefined) {
          setTask(JSON.parse(storedTasks));
          setOldTask(JSON.parse(storedTasks));
        }
      } catch (error) {
        console.error("Error retrieving tasks:", error);
      };
    }
    getTodos();
  }, [])


  return (
    <SafeAreaView
      style={styles.container}
    >
      {/* The header  */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => alert("Orobosa Clicked the button!")}>
          <Ionicons name="menu" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => alert("Temitope Clicked the button!")} >
          <Feather name="user" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* The search bar */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="black" />
        <TextInput value={searchQuery} onChangeText={(text) => setSearchQuery(text)} placeholder="Search..." style={styles.searchInput} clearButtonMode="always" />
      </View>

      {/* The task list  */}
      <FlatList data={[...task].reverse()} keyExtractor={(item) => item.id.toString()} renderItem={({ item }) =>
        <TodoItem todo={item} deleteTodo={deleteTodo} handleDone={handleDone} />}   // Optimized the reusable part of the code by creating a separate component for the task item

      />

      <KeyboardAvoidingView style={styles.addTaskContainer} behavior="padding" keyboardVerticalOffset={10}>
        <TextInput placeholder="Add Task..." value={newTask} onChangeText={(text) => setNewTask(text)} style={styles.addInput} autoCorrect={false} />
        <TouchableOpacity onPress={() => addTodo()} style={styles.addContainer}>
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// The task component 
const TodoItem = ({ todo, deleteTodo, handleDone }: { todo: todoType, deleteTodo: (id: number) => void, handleDone: (id: number) => void }) => {
  return (
    <View style={styles.todoContainer}>
      <View style={[styles.todoInfoContainer, todo.isDone && { opacity: 0.5 }]}>
        <Checkbox value={todo.isDone} onValueChange={() => handleDone(todo.id)} />
        <Text style={[styles.todoText, todo.isDone && { textDecorationLine: "line-through" }]}>{todo.title}</Text>
        <TouchableOpacity
          onPress={() => {
            deleteTodo(todo.id);
            alert(`Task - "${todo.title}}" successfully deleted`)
          }}
          style={{ marginLeft: "auto" }}
        >
          <MaterialIcons name="delete-outline" size={20} color="red" />
        </TouchableOpacity>
      </View>

    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc"
  },
  searchBar: {
    backgroundColor: "white",
    flexDirection: "row",
    gap: 5,
    width: "100%",
    alignItems: "center",
    borderRadius: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 4,
    paddingHorizontal: 10,
    marginVertical: 10
  },
  searchInput: {
    width: "90%",
    marginHorizontal: 10,
    fontSize: 16,
    color: "black",
  },
  todoContainer: {
    display: "flex",
    flexDirection: "column",
    // backgroundColor: "blue",
    gap: 10,
    padding: 10,
    width: "100%",
  },
  todoInfoContainer: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 15,
    width: "100%",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  todoText: {
    fontSize: 16,
  },
  addContainer: {
    backgroundColor: "black",
    borderRadius: 15,
    padding: 10,
  },
  addTaskContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "auto",
    alignItems: "center",
    gap: 10,
  },
  addInput: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    outlineColor: "teal",
    borderColor: "#ccc",
    borderWidth: 1,
  }
})