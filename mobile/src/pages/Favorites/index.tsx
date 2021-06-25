import React from 'react';
import { View } from 'react-native';

import Styles from './styles';

import PageHeader from '../../components/PageHeader';

function Favorites(){
    return (
        <View style={Styles.container}>
            <PageHeader title="Meus Proffys Favoritos"/>
        </View>
    );    
}

export default Favorites;