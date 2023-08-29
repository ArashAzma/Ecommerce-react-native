import { View, Text } from "react-native";
import React from "react";
import tw from "twrnc";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons/faQuoteLeft";
import { faQuoteRight } from "@fortawesome/free-solid-svg-icons/faQuoteRight";
const Title = ({ title }) => {
    return (
        <View
            style={tw`flex-row w-full justify-start pl-2 my-6 font-bold text-2xl`}
        >
            <FontAwesomeIcon icon={faQuoteLeft} style={tw`opacity-60`} />
            <Text style={tw`text-2xl`}>{title}</Text>
            <FontAwesomeIcon icon={faQuoteRight} style={tw`opacity-60`} />
        </View>
    );
};

export default Title;
