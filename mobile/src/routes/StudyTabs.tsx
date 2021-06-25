import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; //Importa todos os pacotes de fontes (icones)

import TeacherList from '../pages/TeacherList';
import Favorites from '../pages/Favorites';

const { Navigator, Screen } = createBottomTabNavigator();

function StudyTabs(){
    return (
        <Navigator
            tabBarOptions={{
                style: {
                    elevation: 0, //Propriedade de sombras no Android
                    shadowOpacity: 0,
                    height: 64,
                },

                tabStyle: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                },

                iconStyle: {
                    flex: 0, //Para de ocupar todo o tamanho da tela
                    width: 20,
                    height: 20,
                },

                labelStyle: {
                    fontFamily: 'Archivo_700Bold',
                    fontSize: 13,
                    marginLeft: 16,
                },

                inactiveBackgroundColor: '#fafafc', //Cor da tab quando não tá selecionada
                activeBackgroundColor: '#ebebf5', //Cor da tab quando tá selecionada
                inactiveTintColor: '#c1bccc', //Cor do texto da tab quando não tá selecionada
                activeTintColor: '#32264d', //Cor do texto da tab quando tá selecionada
            }}

        >
            <Screen
                name="TeacherList" 
                component={TeacherList} 
                options={{
                    tabBarLabel: 'Proffys', //Muda o texto da tab
                    tabBarIcon: ({ color, size, focused }) => {
                        return (
                            <Ionicons name="ios-easel" size={size} color={focused ? '#8257e5' : color} /> //Se tiver com foco vai essa cor #8257e5
                        );
                    }
                }} 
            />
            
            <Screen
                name="Favorites"
                component={Favorites}
                options={{
                    tabBarLabel: 'Favoritos', //Muda o texto da tab
                    tabBarIcon: ({ color, size, focused }) => {
                        return (
                            <Ionicons name="ios-heart" size={size} color={focused ? '#8257e5' : color} />
                        );
                    }
                }}
            />
        </Navigator>
    );
}

export default StudyTabs;