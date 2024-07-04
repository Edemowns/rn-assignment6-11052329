import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const cart = await AsyncStorage.getItem('cart');
        setCartItems(cart ? JSON.parse(cart) : []);
      } catch (error) {
        console.error('Failed to fetch cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  const removeFromCart = async (item) => {
    try {
      const updatedCartItems = cartItems.filter(cartItem => cartItem.id !== item.id);
      setCartItems(updatedCartItems);
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCartItems));
    } catch (error) {
      console.error('Failed to remove item from cart:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={item.icon} style={styles.itemImage} resizeMode="contain" />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>${item.price}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
        <Text style={styles.itemCategory}>{item.category}</Text>
      </View>
      <TouchableOpacity style={styles.removeButton} onPress={() => removeFromCart(item)}>
        <Image source={require('../pictures/remove.png')} style={styles.removeButtonImage} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.header}>
          <Image source={require('../pictures/Logo.png')} style={styles.logo} />
          <Text style={styles.checkoutText}>CHECKOUT</Text>
          <View style={styles.headerIcons}>
            <Image source={require('../pictures/Search.png')} style={styles.headerIcon} />
          </View>
        </View>
        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.flatListContent}
        />

        <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.cartButtonText}>CHECKOUT</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 30,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20, // Space for Checkout text
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', 
    paddingTop: 20,
  },
  logo: {
    width: 120,
    height: 40,
    resizeMode: 'contain',
    marginLeft: 50,
  },
  checkoutText: {
    fontSize: 16,
    textDecorationLine: 'underline',
    marginTop: 50,
    marginRight:60,
  },
  headerIcons: {
    flexDirection: 'row',
    marginLeft: 'auto', // Push icons to the right
  },
  headerIcon: {
    width: 24,
    height: 24,
    marginHorizontal: 10,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  itemImage: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 30,
  },
  itemPrice: {
    fontSize: 14,
    marginBottom: 5,
  },
  itemDescription: {
    fontSize: 12,
    marginBottom: 5,
    color: '#666',
  },
  itemCategory: {
    fontSize: 12,
    marginBottom: 5,
    color: '#666',
  },
  removeButton: {
    marginLeft: 'auto',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  removeButtonImage: {
    width: 24,
    height: 24,
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

export default CartScreen;
