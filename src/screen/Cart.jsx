import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StatusBar, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCart } from '../context/CartContext';
import Images from '../theme/Images';

const Cart = () => {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const {
        cart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        totalPrice,
    } = useCart();

    const renderCartItem = ({ item }) => (
        <View className="flex-row bg-white p-4 mb-3 rounded-2xl border border-[#f1f5f9] shadow-sm items-center">
            <View className="w-16 h-16 bg-[#f8fafc] rounded-xl overflow-hidden mr-4">
                <Image
                    source={Images[item.image]}
                    className="w-full h-full"
                    resizeMode="contain"
                />
            </View>

            <View className="flex-1">
                <View className="flex-row justify-between items-start">
                    <View className="flex-1 mr-2">
                        <Text className="text-gray-900 font-extrabold text-sm" numberOfLines={1}>
                            {item.title}
                        </Text>
                        <Text className="text-[#94a3b8] text-[10px] uppercase font-semibold tracking-wider mt-0.5">
                            {item.category}
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => removeFromCart(item.id)}
                        className="p-1 rounded-full bg-red-50"
                        activeOpacity={0.7}
                    >
                        <Text className="text-red-500 font-bold text-xs px-1">✕</Text>
                    </TouchableOpacity>
                </View>

                <View className="flex-row justify-between items-center mt-3">
                    <Text className="text-[#4f46e5] font-black text-sm">
                        ${(item.price * item.quantity).toFixed(2)}
                    </Text>
                    <View className="flex-row items-center border border-[#e2e8f0] rounded-xl overflow-hidden bg-[#f8fafc]">
                        <TouchableOpacity
                            onPress={() => decreaseQuantity(item.id)}
                            className="w-8 h-8 items-center justify-center active:bg-[#e2e8f0]"
                            activeOpacity={0.7}
                        >
                            <Text className="text-gray-600 font-bold text-sm">-</Text>
                        </TouchableOpacity>

                        <Text className="text-gray-900 font-bold text-xs px-3">{item.quantity}</Text>

                        <TouchableOpacity
                            onPress={() => increaseQuantity(item.id)}
                            className="w-8 h-8 items-center justify-center active:bg-[#e2e8f0]"
                            activeOpacity={0.7}
                        >
                            <Text className="text-gray-600 font-bold text-sm">+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );

    const renderEmptyCart = () => (
        <View className="flex-1 items-center justify-center px-6 bg-[#f8fafc]">
            <View className="w-32 h-32 bg-white rounded-full items-center justify-center shadow-sm mb-6 border border-[#f1f5f9]">
                <Image
                    source={Images.ShoppingCart}
                    className="w-10 h-10"
                    resizeMode="contain"
                // tintColor="#fff" 
                />
            </View>
            <Text numberOfLines={1} className="text-gray-900 text-lg font-black text-center mb-2">
                Your Cart is Empty
            </Text>
            <Text className="text-gray-500 text-xs text-center leading-5 mb-8">
                Looks like you haven't added anything to your cart yet. Go back to discover amazing deals!
            </Text>
            <TouchableOpacity
                onPress={() => navigation.navigate('Home')}
                activeOpacity={0.8}
                className="bg-[#4f46e5] rounded-2xl py-3.5 px-10 shadow-md active:bg-[#4338ca]"
            >
                <Text className="text-white font-extrabold text-sm">Start Shopping</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View className="flex-1 bg-[#f8fafc]">
            <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

            <View
                style={{ paddingTop: insets.top + 10 }}
                className="bg-white border-b border-[#f1f5f9] px-5 pb-4 items-center justify-center"
            >
                <Text className="text-lg font-black text-gray-900">Shopping Cart</Text>
            </View>

            {cart.length === 0 ? (
                renderEmptyCart()
            ) : (
                <View className="flex-1">
                    <FlatList
                        data={cart}
                        renderItem={renderCartItem}
                        keyExtractor={(item) => item.id.toString()}
                        contentContainerClassName="p-5"
                        showsVerticalScrollIndicator={false}
                    />

                    <View
                        style={{ paddingBottom: insets.bottom + 16 }}
                        className="bg-white border-t border-[#f1f5f9] px-6 pt-5"
                    >
                        <View className="flex-row justify-between items-center mb-4">
                            <Text className="text-gray-400 text-xs font-bold uppercase tracking-wider">Subtotal</Text>
                            <Text className="text-gray-950 font-black text-lg">${totalPrice.toFixed(2)}</Text>
                        </View>
                        <View className="flex-row justify-between items-center mb-6">
                            <Text className="text-gray-400 text-xs font-bold uppercase tracking-wider">Shipping</Text>
                            <Text className="text-[#16a34a] text-xs font-extrabold uppercase bg-green-50 px-2.5 py-1 rounded-md">
                                Free
                            </Text>
                        </View>

                        <View className="flex-row justify-between items-center border-t border-[#f1f5f9] pt-4 mb-6">
                            <Text className="text-gray-900 font-extrabold text-sm">Grand Total</Text>
                            <Text className="text-[#4f46e5] font-black text-2xl">${totalPrice.toFixed(2)}</Text>
                        </View>

                        <TouchableOpacity
                            activeOpacity={0.8}
                            className="bg-yellow-400 border border-yellow-500 rounded-2xl py-4 items-center justify-center shadow-sm active:bg-yellow-500"
                        >
                            <Text className="text-black font-extrabold text-sm">Proceed to Checkout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
};

export default Cart;