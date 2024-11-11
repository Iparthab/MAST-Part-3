import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
} from 'react-native';

// Define the type for the dish
type Dish = {
  name: string;
  course: string;
  price: number;
  description?: string;
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<string>('Start');
  const [dishes, setDishes] = useState<Dish[]>([
    { name: 'Pizza', course: 'Main', price: 12 },
    { name: 'Pasta', course: 'Main', price: 10 },
    { name: 'Burger', course: 'Main', price: 8 },
  ]);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [dishDetails, setDishDetails] = useState<Dish>({
    name: '',
    description: '',
    course: '',
    price: 0,
  });
  const [filteredDishes, setFilteredDishes] = useState<Dish[]>(dishes);

  const handleDishSelect = (dish: Dish) => {
    setSelectedDish(dish);
    setDishDetails(dish); // Populate dishDetails with selected dish data
    setCurrentScreen('DishDetails');
  };

  const handleAddDish = () => {
    setDishes([...dishes, { ...dishDetails }]);
    setCurrentScreen('Menu');
  };

  const handleRemoveDish = (dishName: string) => {
    setDishes(dishes.filter(dish => dish.name !== dishName));
  };

  const calculateAveragePrice = () => {
    if (dishes.length === 0) return 0;
    const total = dishes.reduce((acc, dish) => acc + dish.price, 0);
    return total / dishes.length;
  };

  const filterDishesByCourse = (course: string) => {
    const filtered = dishes.filter(dish => dish.course === course);
    setFilteredDishes(filtered);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Start':
        return (
          <ImageBackground source={require('./assets/background.png')} style={styles.backgroundImage}>
            <Image source={require('./assets/front_image.png')} style={styles.frontImage} />
            <Image source={require('./assets/Logo.png')} style={styles.logoImage} />
            <Text style={styles.navText}>Start Page</Text>
            <Text style={styles.navText}>Average Price: ${calculateAveragePrice().toFixed(2)}</Text>
            <TouchableOpacity style={styles.youtubeButton} onPress={() => setCurrentScreen('Menu')}>
              <Text style={styles.youtubeButtonText}>Go to Menu</Text>
            </TouchableOpacity>
          </ImageBackground>
        );
      case 'Menu':
        return (
          <View style={styles.container}>
            <Text style={styles.menuTitle}>Chef's Dish List</Text>
            {dishes.map((dish, index) => (
              <View key={index} style={styles.menuItem}>
                <Text style={styles.dishItem}>{dish.name}</Text>
                <Text>{dish.course} - ${dish.price}</Text>
                <TouchableOpacity onPress={() => handleRemoveDish(dish.name)}>
                  <Text style={styles.removeButton}>Remove</Text>
                </TouchableOpacity>
              </View>
            ))}
            <TouchableOpacity onPress={() => setCurrentScreen('AddDish')}>
              <Text style={styles.addButton}>Add New Dish</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setCurrentScreen('FilterDishes')}>
              <Text style={styles.addButton}>Filter by Course</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setCurrentScreen('Start')}>
              <Text style={styles.backButton}>Back to Start</Text>
            </TouchableOpacity>
          </View>
        );
      case 'AddDish':
        return (
          <View style={styles.container}>
            <TouchableOpacity style={styles.topButton} onPress={() => setCurrentScreen('Menu')}>
              <Text>Back</Text>
            </TouchableOpacity>
            <View style={styles.dishEditContainer}>
              <TextInput
                placeholder="Dish Name"
                value={dishDetails.name}
                onChangeText={(text) => setDishDetails({ ...dishDetails, name: text })}
                style={styles.input}
              />
              <TextInput
                placeholder="Description"
                value={dishDetails.description}
                onChangeText={(text) => setDishDetails({ ...dishDetails, description: text })}
                style={styles.input}
              />
              <TextInput
                placeholder="Course (e.g., Starter, Main, Dessert)"
                value={dishDetails.course}
                onChangeText={(text) => setDishDetails({ ...dishDetails, course: text })}
                style={styles.input}
              />
              <TextInput
                placeholder="Price"
                value={String(dishDetails.price)}
                onChangeText={(text) => setDishDetails({ ...dishDetails, price: parseFloat(text) })}
                style={styles.input}
                keyboardType="numeric"
              />
            </View>
            <TouchableOpacity style={styles.editButton} onPress={handleAddDish}>
              <Text style={styles.buttonText}>Add Dish</Text>
            </TouchableOpacity>
          </View>
        );
      case 'FilterDishes':
        return (
          <View style={styles.container}>
            <Text style={styles.menuTitle}>Filter Dishes by Course</Text>
            <TouchableOpacity onPress={() => filterDishesByCourse('Starter')}>
              <Text style={styles.filterButton}>Show Starters</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => filterDishesByCourse('Main')}>
              <Text style={styles.filterButton}>Show Mains</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => filterDishesByCourse('Dessert')}>
              <Text style={styles.filterButton}>Show Desserts</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setCurrentScreen('Menu')}>
              <Text style={styles.backButton}>Back to Menu</Text>
            </TouchableOpacity>
            <View style={styles.filteredMenu}>
              {filteredDishes.map((dish, index) => (
                <Text key={index} style={styles.dishItem}>{dish.name} - ${dish.price}</Text>
              ))}
            </View>
          </View>
        );
      default:
        return <Text>Unknown Screen</Text>;
    }
  };

  return (
    <View style={styles.appContainer}>
      {renderScreen()}
      <StatusBar style="auto" />
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  frontImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    position: 'absolute',
    top: 0,
  },
  logoImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginTop: 220,
  },
  navText: {
    color: 'black',
    marginTop: 20,
    fontSize: 18,
  },
  youtubeButton: {
    backgroundColor: '#FF0000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginTop: 30,
  },
  youtubeButtonText: {
    color: 'white',
    fontSize: 18,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  menuTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  menuItem: {
    width: '100%',
    backgroundColor: '#f8f8f8',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dishItem: {
    fontSize: 18,
    color: '#333',
  },
  addButton: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginTop: 20,
    color: 'white',
  },
  removeButton: {
    color: 'red',
    marginTop: 10,
  },
  backButton: {
    marginTop: 20,
    color: '#007bff',
    fontSize: 18,
  },
  filterButton: {
    backgroundColor: '#007bff',
    color: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    width: '80%',
    paddingLeft: 10,
    borderRadius: 5,
  },
  editButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  filteredMenu: {
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
  },
  dishEditContainer: {
    width: '80%',  // Set the width for the container
    alignItems: 'center',  // Align the children (input fields) in the center
    justifyContent: 'center',  // Ensure items are centered vertically
    marginTop: 20,  // Add some margin at the top for spacing
  },
  topButton: {
    backgroundColor: '#f0f0f0',  // Light gray background color
    paddingVertical: 10,          // Vertical padding for button
    paddingHorizontal: 20,        // Horizontal padding for button
    borderRadius: 50,             // Rounded corners
    alignItems: 'center',         // Center text horizontally
    justifyContent: 'center',     // Center text vertically
    marginBottom: 20,             // Margin at the bottom for spacing
  },
  courseTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  menuContainer: {
    paddingHorizontal: 20,  // Add horizontal padding for better layout
    paddingVertical: 10,    // Add vertical padding to avoid text being too close to edges
    backgroundColor: '#f1f1f1', // Light background for menu
    alignItems: 'flex-start',  // Align items to the left (or center if you prefer)
    justifyContent: 'flex-start', // Keep the content aligned to the top
  },
  courseSection: {
    marginBottom: 30, // Add margin at the bottom of each course section
    width: '100%',    // Ensure the course section takes up full width
  },

});



