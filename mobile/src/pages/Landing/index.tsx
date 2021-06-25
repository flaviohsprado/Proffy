import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler'; //Botão que adapta o click do usuário ao sistema operacional

import Styles from "./styles";

import landingImg from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';

function Landing(){
    const { navigate } = useNavigation();

    function handleNavigateToGiveClassesPage(){
        navigate('GiveClasses');
    }

    function handleNavigateToStudyPages(){
        navigate('Study')
    }

    //{'\n'}: chaves para falar que é um comando javascript e o \n pra fazer a quebra
    //O Text é o unico elemento que herda o estilo, por isso o segundo Text dentro do primeiro herda o CSS do primeiro
    return (
        <View style={Styles.container}>
            <Image source={landingImg} style={Styles.banner}/>

            <Text style={Styles.title}>
                Seja bem-vindo, {'\n'}

                <Text style={Styles.titleBold}>O que deseja fazer?</Text>
            </Text>

            <View style={Styles.buttonsContainer}>
                <RectButton onPress={handleNavigateToStudyPages} style={[Styles.button, Styles.buttonPrimary]}>
                    <Image source={studyIcon}/>
                    <Text style={Styles.buttonText}>Estudar</Text>
                </RectButton>

                <RectButton
                    onPress={handleNavigateToGiveClassesPage} 
                    style={[Styles.button, Styles.buttonSecondary]}
                >
                    <Image source={giveClassesIcon}/>
                    <Text style={Styles.buttonText}>Dar Aulas</Text>
                </RectButton>
            </View>

            <Text style={Styles.totalConnections}>
                Total de 285 conexões já realizadas {' '} <Image source={heartIcon}/>
            </Text>
        </View>
    );
}

export default Landing;