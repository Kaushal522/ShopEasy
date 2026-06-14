import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCart } from '../context/CartContext';
import Images from '../theme/Images';

const Details = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const insets = useSafeAreaInsets();
    const { addToCart } = useCart();

    const { product } = route.params || {};

    if (!product) {
        return (
            <SafeAreaView className="flex-1 bg-white items-center justify-center">
                <Text className="text-[#1e293b] font-bold">Product not found</Text>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className="mt-4 bg-indigo-600 px-6 py-3 rounded-2xl"
                >
                    <Text className="text-white font-bold">Go Back</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    const renderStars = (rating) => {
        const stars = [];
        const floorRating = Math.floor(rating);
        for (let i = 0; i < 5; i++) {
            stars.push(
                <Text key={i} className={`text-base ${i < floorRating ? 'opacity-100' : 'opacity-30'}`}>
                    ⭐
                </Text>
            );
        }
        return stars;
    };

    return (
        <View className="flex-1 bg-[#f8fafc]">
            <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

            {/* Custom Header */}
            <View
                style={{ paddingTop: insets.top + 10 }}
                className="flex-row items-center justify-between px-5 pb-4 bg-white border-b border-[#f1f5f9]"
            >
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className="w-10 h-10 items-center justify-center bg-[#f1f5f9] rounded-full active:bg-gray-250"
                    activeOpacity={0.7}
                >
                    <Text className="text-xl font-bold text-gray-800">←</Text>
                </TouchableOpacity>
                <Text className="text-lg font-bold text-gray-900">Product Details</Text>
                <View className="w-10 h-10" />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
                {/* Product Illustration */}
                <View className="bg-white items-center justify-center py-12 border-b border-[#f1f5f9]">
                    <View className="w-64 h-64 bg-[#f8fafc] rounded-full overflow-hidden items-center justify-center shadow-inner">
                        <Image
                            source={Images[product.image]}
                            className="w-full h-full"
                            resizeMode="contain"
                        />
                    </View>
                </View>

                {/* Details Container */}
                <View className="p-6 bg-white mt-3 flex-1">
                    <Text className="text-[#4f46e5] text-xs font-bold uppercase tracking-widest">{product.category}</Text>
                    <Text className="text-gray-900 font-extrabold text-2xl mt-1 leading-8">{product.title}</Text>

                    {/* Rating Section */}
                    <View className="flex-row items-center mt-3 border-b border-[#f1f5f9] pb-4">
                        <View className="flex-row mr-2">
                            {renderStars(product.rating)}
                        </View>
                        <Text className="text-gray-800 font-bold text-sm">{product.rating} Rating</Text>
                        <Text className="text-gray-400 text-sm ml-2">| 120+ reviews</Text>
                    </View>

                    {/* Description Section */}
                    <View className="mt-5">
                        <Text className="text-gray-900 font-bold text-base">Product Description</Text>
                        <Text className="text-gray-500 text-sm leading-6 mt-2">
                            {product.description}
                        </Text>
                    </View>

                    {/* Features/Badges */}
                    <View className="flex-row flex-wrap mt-6 border-t border-b border-[#f1f5f9] py-4">
                        <View className="bg-[#f0fdf4] border border-[#bbf7d0] px-3 py-1.5 rounded-full mr-3 mb-2">
                            <Text className="text-[#16a34a] text-xs font-semibold">✓ Free Delivery</Text>
                        </View>
                        <View className="bg-[#fefce8] border border-[#fef08a] px-3 py-1.5 rounded-full mr-3 mb-2">
                            <Text className="text-[#ca8a04] text-xs font-semibold">⚡ Top Quality</Text>
                        </View>
                        <View className="bg-[#f0f9ff] border border-[#bae6fd] px-3 py-1.5 rounded-full mb-2">
                            <Text className="text-[#0284c7] text-xs font-semibold">↺ 30-Day Return</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Bottom Purchase Bar */}
            <View
                style={{ paddingBottom: insets.bottom + 16 }}
                className="bg-white border-t border-[#f1f5f9] px-6 pt-4 flex-row justify-between items-center"
            >
                <View>
                    <Text className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Total Price</Text>
                    <Text className="text-[#4f46e5] text-2xl font-black">${product.price.toFixed(2)}</Text>
                </View>
                <TouchableOpacity
                    onPress={() => addToCart(product)}
                    activeOpacity={0.8}
                    className="bg-yellow-400 border border-yellow-500 py-3.5 px-8 rounded-2xl items-center justify-center active:bg-yellow-500 shadow-sm"
                >
                    <Text className="text-black font-extrabold text-sm">Add to Cart</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Details;