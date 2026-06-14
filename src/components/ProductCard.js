import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useCart } from '../context/CartContext';
import { useNavigation } from '@react-navigation/native';
import Images from '../theme/Images';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const navigation = useNavigation();

    // Render stars based on rating
    const renderStars = (rating) => {
        const stars = [];
        const floorRating = Math.floor(rating);
        for (let i = 0; i < 5; i++) {
            stars.push(
                <Text key={i} className={`text-[10px] ${i < floorRating ? 'opacity-100' : 'opacity-30'}`}>
                    ⭐
                </Text>
            );
        }
        return stars;
    };

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('Details', { product })}
            className="w-[48%] bg-white rounded-2xl p-3 mb-4 border border-[#f1f5f9] shadow-sm flex flex-col justify-between"
            activeOpacity={0.9}
        >
            <View>
                {/* Product Image Illustration */}
                <View className="bg-[#f8fafc] w-full h-[120px] rounded-xl items-center justify-center mb-3 overflow-hidden">
                    <Image
                        source={Images[product.image]}
                        className="w-full h-full"
                        resizeMode="contain"
                    />
                </View>

                {/* Product Category & Title */}
                <Text className="text-[#94a3b8] text-[10px] font-semibold uppercase tracking-wider">{product.category}</Text>
                <Text className="text-[#1e293b] font-bold text-sm mt-1" numberOfLines={1}>
                    {product.title}
                </Text>

                {/* Rating */}
                <View className="flex-row items-center mt-2">
                    <View className="flex-row mr-1">
                        {renderStars(product.rating)}
                    </View>
                    <Text className="text-[#475569] text-[11px] font-bold ml-1">{product.rating}</Text>
                </View>
            </View>

            <View className="mt-4">
                <Text className="text-[#4f46e5] font-extrabold text-base mb-2">${product.price.toFixed(2)}</Text>
                <TouchableOpacity
                    onPress={() => addToCart(product)}
                    activeOpacity={0.8}
                    className="bg-yellow-400 border border-yellow-500 rounded-xl py-2 items-center justify-center active:bg-yellow-500"
                >
                    <Text className="text-black font-bold text-xs">Add to Cart</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

export default ProductCard;
