import React from 'react';
import { StyleSheet } from 'react-native';
import {
    Button,
    Icon,
    List,
    ListItem,
} from 'react-native-ui-kitten';

const SAMPLE_DATA = {
    title: 'Title for Item',
    description: 'Description for Item',
};

export const ItemShowcaseList = () => {

    const data = new Array(15).fill(SAMPLE_DATA);

    const renderItemAccessory = (style) => (
        <Button style={style}>ADD</Button>
    );

    const renderItemIcon = (style) => (
        <Icon {...style} name='person' />
    );

    const renderItem = ({ item, index }) => (
        <ListItem
            title={`${item.title} ${index + 1}`}
            description={`${item.description} ${index + 1}`}
            icon={renderItemIcon}
            accessory={renderItemAccessory}
        />
    );

    return (
        <List
            style={styles.list}
            data={data}
            renderItem={renderItem}
        />
    );
};

const styles = StyleSheet.create({
    list: {
        height: '100%',
    },
});
