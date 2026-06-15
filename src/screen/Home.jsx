import React, { useState, useMemo } from 'react';
import {
    ImageBackground,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    ScrollView,
    StatusBar,
    FlatList,
    Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Images from '../theme/Images';
import ProductCard from '../components/ProductCard';
import productsData from '../data/products.json';
import { useCart } from '../context/CartContext';

const Home = () => {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const { cartCount } = useCart();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);

    const categories = [
        { id: 1, name: 'Tech', icon: Images.Tech, colorBg: 'bg-[#dbeafe]', colorText: 'text-[#2563eb]' },
        { id: 2, name: 'Fashion', icon: Images.Fashion, colorBg: 'bg-[#d1fae5]', colorText: 'text-[#059669]' },
        { id: 3, name: 'Home', icon: Images.Home2, colorBg: 'bg-[#ffedd5]', colorText: 'text-[#ea580c]' },
        { id: 4, name: 'Sports', icon: Images.Sports, colorBg: 'bg-[#f3e8ff]', colorText: 'text-[#7c3aed]' },
        { id: 5, name: 'Beauty', icon: Images.Beauty, colorBg: 'bg-[#fce7f3]', colorText: 'text-[#db2777]' },
    ];

    const filteredProducts = useMemo(() => {
        return productsData.filter((product) => {
            const matchesSearch =
                product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.category.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesCategory = selectedCategory
                ? product.category.toLowerCase() === selectedCategory.toLowerCase() ||
                (selectedCategory === 'Tech' && product.category === 'Electronics') ||
                (selectedCategory === 'Home' && product.category === 'Office')
                : true;

            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory]);

    const handleCategoryPress = (categoryName) => {
        if (selectedCategory === categoryName) {
            setSelectedCategory(null);
        } else {
            setSelectedCategory(categoryName);
        }
    };

    const renderHeader = () => (
        <View className="w-full">
            <View className="mx-5 mt-6 bg-gradient-to-r from-blue-500 to-indigo-600 bg-indigo-600 rounded-2xl overflow-hidden shadow-md">
                <View className="p-6">
                    <Text className="text-[#c7d2fe] text-xs font-bold tracking-wider uppercase mb-1">Limited Offer</Text>
                    <Text className="text-white text-xl font-extrabold leading-7 mb-3">Summer Savings Event Up to 50% Off</Text>
                    <TouchableOpacity className="bg-yellow-400 self-start px-4 py-2 rounded-xl border border-yellow-500">
                        <Text className="text-black font-bold text-xs">Shop Now</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Categories Section */}
            <View className="mt-6 mb-4">
                <View className="flex-row justify-between items-center px-5 mb-3">
                    <Text className="text-[#1e293b] text-lg font-bold">Categories</Text>
                    {selectedCategory && (
                        <TouchableOpacity onPress={() => setSelectedCategory(null)}>
                            <Text className="text-[#4f46e5] font-bold text-sm">Clear Filter</Text>
                        </TouchableOpacity>
                    )}
                </View>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerClassName="px-[15px]"
                >
                    {categories.map((item) => {
                        const isSelected = selectedCategory === item.name;
                        return (
                            <TouchableOpacity
                                key={item.id}
                                onPress={() => handleCategoryPress(item.name)}
                                className={`items-center mx-2 p-2 rounded-2xl border ${isSelected ? 'border-yellow-500 bg-yellow-50' : 'border-transparent'
                                    }`}
                                activeOpacity={0.7}
                            >
                                <View className={`w-14 h-14 rounded-2xl items-center justify-center mb-2 ${item.colorBg}`}>
                                    <Image
                                        source={item.icon}
                                        className="w-8 h-8"
                                        resizeMode="contain"
                                        tintColor="#475569"
                                    />
                                </View>
                                <Text className="text-[#475569] text-xs font-semibold">{item.name}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>

            <View className="px-5 mb-3 flex-row justify-between items-center">
                <Text className="text-[#1e293b] text-lg font-bold">
                    {selectedCategory ? `${selectedCategory} Collection` : 'Popular Deals'}
                </Text>
                <Text className="text-[#94a3b8] text-xs font-semibold">{filteredProducts.length} items</Text>
            </View>
        </View>
    );

    const renderEmpty = () => (
        <View className="py-20 items-center justify-center">
            <Text className="text-5xl mb-4">🔍</Text>
            <Text className="text-[#1e293b] text-base font-bold mb-1">No Products Found</Text>
            <Text className="text-[#94a3b8] text-xs px-10 text-center">
                We couldn't find any products matching "{searchQuery}". Try a different term or clear filters.
            </Text>
        </View>
    );

    return (
        <View className="flex-1 bg-[#f8fafc]">
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            <ImageBackground
                source={Images.Header}
                className="w-full rounded-bl-[32px] rounded-br-[32px] overflow-hidden"
                resizeMode="cover"
            >
                <View
                    style={{ paddingTop: insets.top + 12 }}
                    className="px-5 pb-6 bg-[rgba(0,0,0,0.25)]"
                >
                    <View className="flex-row justify-between items-center mb-5">
                        <View className="flex-row items-center bg-[rgba(255,255,255,0.15)] px-[14px] py-2 rounded-full border border-[rgba(255,255,255,0.2)]">
                            <Text className="text-white text-base font-bold tracking-tight">
                                Shop<Text className="text-[#facc15]">Easy</Text>
                            </Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Cart')}
                            activeOpacity={0.7}
                            className="w-11 h-11 items-center justify-center bg-[rgba(255,255,255,0.2)] border border-[rgba(255,255,255,0.25)] rounded-full relative"
                        >
                            <Image
                                source={Images.ShoppingCart}
                                className="w-5 h-5"
                                resizeMode="contain"
                                tintColor="#fff"
                            />
                            {cartCount > 0 && (
                                <View className="absolute -top-[4px] -right-[4px] bg-[#ef4444] rounded-full min-w-[18px] h-[18px] px-1 items-center justify-center border border-white">
                                    <Text className="text-white text-[9px] font-black">{cartCount}</Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    </View>
                    <View className="flex-row items-center bg-white rounded-2xl px-4 border border-[#f1f5f9] shadow-sm">
                        <Image
                            source={Images.Search}
                            className="w-5 h-5 mr-2"
                            resizeMode="contain"
                            tintColor="#94a3b8"
                        />
                        <TextInput
                            placeholder="Search products, categories..."
                            placeholderTextColor="#94a3b8"
                            className="flex-1 h-11 text-[#1e293b] text-sm py-0"
                            returnKeyType="search"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                        {searchQuery.length > 0 && (
                            <TouchableOpacity onPress={() => setSearchQuery('')}>
                                <Text className="text-gray-400 font-bold px-2 text-xs">✕</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </ImageBackground>

            <FlatList
                data={filteredProducts}
                renderItem={({ item }) => <ProductCard product={item} />}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                columnWrapperClassName="justify-between px-5"
                ListHeaderComponent={renderHeader}
                ListEmptyComponent={renderEmpty}
                contentContainerClassName="pb-10"
                showsVerticalScrollIndicator={false}
                initialNumToRender={6}
                maxToRenderPerBatch={10}
                windowSize={5}
                removeClippedSubviews={true}
            />
        </View>
    );
};

export default Home;