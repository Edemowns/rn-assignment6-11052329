import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { saveItems, loadItems } from '../components/Storage'; // Assuming these functions are correctly defined

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([
    { id: '1', name: 'Reversible Angora Cardigan', price: 120, icon: require('../pictures/dress1.png') },
    { id: '2', name: 'Black', price: 120, icon: require('../pictures/dress2.png') },
    { id: '3', name: 'Church Wear', price: 80, icon: require('../pictures/dress3.png') },
    { id: '4', name: 'Lamerei', price: 200, icon: require('../pictures/dress4.png') },
    { id: '5', name: '21WN', price: 150, icon: require('../pictures/dress5.png') },
    { id: '6', name: 'Lopo', price: 300, icon: require('../pictures/dress6.png') },
    { id: '7', name: 'Wool Coat', price: 250, icon: require('../pictures/dress7.png') },
    { id: '8', name: 'Cotton T-Shirt', price: 50, icon: require('../pictures/dress7.png') },
  ]);

  const [cart, setCart] = useState([]);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const savedItems = await loadItems();
        if (savedItems) {
          setCart(savedItems);
        }
      } catch (error) {
        console.error('Failed to load cart items:', error);
      }
    };

    loadCart();
  }, []);

  const addToCart = async (product) => {
    try {
      const cart = await AsyncStorage.getItem('cart');
      const cartItems = cart ? JSON.parse(cart) : [];
      const updatedCartItems = [...cartItems, product];
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCartItems));
      setCart(updatedCartItems); // Update state if needed
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <ImageBackground source={item.icon} style={styles.itemImage} resizeMode='contain'>
        <TouchableOpacity style={styles.addToCartButton} onPress={() => addToCart(item)}>
          <Image source={require('../pictures/add_circle.png')} style={styles.addIcon} />
        </TouchableOpacity>
      </ImageBackground>
      <Text style={styles.itemText}>{item.name}</Text>
      <Text style={[styles.itemText, styles.itemPrice]}>${item.price}</Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={require('../pictures/Menu.png')} />
          <Image source={require('../pictures/Logo.png')} />
          <View style={styles.headerIcons}>
            <Image source={require('../pictures/Search.png')} />
            <Image source={require('../pictures/shoppingBag.png')} />
          </View>
        </View>

        <View style={styles.storyHeader}>
          <Text style={styles.storyText}>OUR STORY</Text>
          <View style={styles.storyIcons}>
            <Image source={require('../pictures/Listview.png')} />
            <Image source={require('../pictures/Filter.png')} />
          </View>
        </View>

        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.productContainer}
          columnWrapperStyle={styles.columnWrapper}
        />

        <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate('Cart')}>
          <Text style={styles.cartButtonText}>Go to Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 30, // Margin top to push content down
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 10,
  },
  storyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  storyText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  storyIcons: {
    flexDirection: 'row',
    gap: 10,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  productContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8, // Adjust margin to create space between items
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  item: {
    width: (screenWidth / 2) - 24,
    marginBottom: 16,
    alignItems: 'center',
  },
  itemImage: {
    width: '100%',
    height: 300,
    justifyContent: 'flex-end',
  },
  addToCartButton: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 15,
    padding: 5,
  },
  addIcon: {
    width: 24,
    height: 24,
  },
  itemText: {
    textAlign: 'center',
    marginTop: 5,
  },
  itemPrice: {
    color: 'orange',
  },
  cartButton: {
    marginTop: 5,
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  cartButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default HomeScreen;
