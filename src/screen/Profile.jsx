import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar, Alert, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Images from '../theme/Images';

const Profile = () => {
    const insets = useSafeAreaInsets();

    const settingsOptions = [
        { id: 1, title: 'My Profile', description: 'Edit profile details', icon: Images.Profile },
        { id: 2, title: 'My Orders', description: 'Track, return, or buy items again', icon: Images.Order },
        { id: 3, title: 'Shipping Addresses', description: 'Manage delivery addresses', icon: Images.Location },
        { id: 4, title: 'Help Center', description: 'FAQs, contact support, chat helper', icon: Images.HelpSupport },
        { id: 5, title: 'Account Settings', description: 'Update profile, change passwords', icon: Images.Settings },
    ];



    return (
        <View className="flex-1 bg-[#f8fafc]">
            <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

            {/* Custom Header */}
            <View
                style={{ paddingTop: insets.top + 10 }}
                className="bg-white border-b border-[#f1f5f9] px-5 pb-4 items-center justify-center"
            >
                <Text className="text-lg font-black text-gray-900">My Profile</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
                {/* User Card */}
                <View className="bg-white p-6 border-b border-[#f1f5f9] items-center">
                    {/* Avatar Bubble */}
                    <View className="w-24 h-24 bg-indigo-50 border-4 border-indigo-100 rounded-full items-center justify-center shadow-sm mb-4">
                        <Image source={Images.Profile} className="w-10 h-10" />
                    </View>

                    {/* Metadata */}
                    <Text className="text-gray-900 font-extrabold text-xl">Kaushal</Text>
                    <Text className="text-gray-400 text-xs mt-1">kaushal@example.com</Text>

                    {/* Quick Stats */}
                    <View className="flex-row mt-6 border-t border-gray-100 pt-4 w-full justify-around">
                        <View className="items-center">
                            <Text className="text-gray-950 font-black text-base">12</Text>
                            <Text className="text-gray-400 text-[10px] uppercase font-bold tracking-wider mt-0.5">Orders</Text>
                        </View>
                        <View className="items-center border-l border-r border-gray-100 px-8">
                            <Text className="text-gray-950 font-black text-base">3</Text>
                            <Text className="text-gray-400 text-[10px] uppercase font-bold tracking-wider mt-0.5">Coupons</Text>
                        </View>
                        <View className="items-center">
                            <Text className="text-gray-950 font-black text-base">450</Text>
                            <Text className="text-gray-400 text-[10px] uppercase font-bold tracking-wider mt-0.5">Points</Text>
                        </View>
                    </View>
                </View>

                {/* Settings Items */}
                <View className="mt-3 bg-white border-t border-b border-[#f1f5f9] px-5 py-2">

                    {settingsOptions.map((option) => (
                        <TouchableOpacity
                            key={option.id}
                            activeOpacity={0.7}
                            className="flex-row items-center py-4 border-b border-gray-50 last:border-0"
                        >
                            {/* Icon */}
                            <View className="w-10 h-10 bg-[#f8fafc] rounded-xl items-center justify-center mr-4 border border-[#f1f5f9]">
                                <Image source={option.icon} className="w-6 h-6" tintColor={"#000"} />
                            </View>

                            {/* Label */}
                            <View className="flex-1 mr-2">
                                <Text className="text-gray-900 font-extrabold text-sm">{option.title}</Text>
                                <Text className="text-gray-400 text-[10px] mt-0.5">{option.description}</Text>
                            </View>

                            {/* Arrow */}
                            <Image source={Images.RightArrow} className="w-6 h-6" tintColor={"#000"} />
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Logout Button */}
                <View className="p-6 mb-10">
                    <TouchableOpacity
                        activeOpacity={0.8}
                        className="bg-red-50 border border-red-200 rounded-2xl py-4 items-center justify-center"
                    >
                        <Text className="text-red-500 font-extrabold text-sm">Log Out</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

export default Profile;