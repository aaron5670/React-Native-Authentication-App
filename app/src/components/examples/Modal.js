
import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Modal, Text, Layout } from 'react-native-ui-kitten';

export class ModalShowcase extends React.Component {

    state = {
        modalVisible: false,
    };

    setModalVisible = () => {
        const modalVisible = !this.state.modalVisible;
        this.setState({ modalVisible });
    };

    renderModalElement = () => {
        return (
            <Layout
                level='3'
                style={styles.modalContainer}>
                <Text>This is modal</Text>
                <Button onPress={this.setModalVisible}>Hide Modal</Button>
            </Layout>
        );
    };

    render() {
        return (
            <Layout style={styles.container}>
                <Button onPress={this.setModalVisible}>Show Modal</Button>
                <Modal
                    allowBackdrop={true}
                    backdropStyle={{ backgroundColor: 'black', opacity: 0.5 }}
                    onBackdropPress={this.setModalVisible}
                    visible={this.state.modalVisible}>
                    {this.renderModalElement()}
                </Modal>
            </Layout>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    modalContainer: {
        width: 200,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
