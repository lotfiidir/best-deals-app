import React from 'react'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'
import {
    View,
    TextInput,
    Image,
    Text,
    StyleSheet,
    ScrollView,
    TouchableHighlight,
} from 'react-native'

const createDealMutation = gql`
    mutation ($description: String!, $image: String!, $title: String!, $reduction: Int){
        createDeal(description: $description, image: $image, title: $title, reduction: $reduction) {
            id
        }
    }
`;

class CreatePage extends React.Component {

    state = {
        description: '',
        image: '',
        title: '',
        reduction: null,
    };

    render() {

        return (
            <ScrollView style={styles.ScrollContainer}>
                <View style={styles.container}>
                    <View style={styles.addImageContainer}>
                        <View style={styles.addImage}>
                            <View style={styles.photoPlaceholderContainer}>
                                {
                                    this.state.image.length > 0 ?
                                        <Image
                                            source={{uri: this.state.image}}
                                            style={{height: 80, width: 80}}
                                            resizeMode='contain'
                                        />
                                        :
                                        <View style={styles.photoPlaceholder}/>
                                }
                            </View>
                            <TextInput
                                style={styles.imageInput}
                                placeholder="Coller l'url de l'image ici..."
                                onChangeText={(text) => this.setState({image: text})}
                                value={this.state.image}
                                placeholderTextColor='rgba(42,126,211,.5)'
                            />
                        </View>
                    </View>
                    <TextInput
                        style={styles.descriptionInput}
                        placeholder='Titre...'
                        onChangeText={(text) => this.setState({title: text})}
                        value={this.state.title}
                    />
                    <TextInput
                        style={styles.descriptionInput}
                        placeholder='Description...'
                        onChangeText={(text) => this.setState({description: text})}
                        value={this.state.description}
                    />
                    <TextInput
                        style={styles.reductionInput}
                        keyboardType='numeric'
                        placeholder='% de la réduction...'
                        onChangeText={(number) => this.setState({reduction: number})}
                        value={this.state.reduction}
                    />

                    <View style={styles.buttons}>
                        <TouchableHighlight
                            style={styles.cancelButton}
                            onPress={() => this.props.onComplete()}
                        >
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={styles.saveButton}
                            onPress={() => this._createDeal()}
                        >
                            <Text style={styles.saveButtonText}>Create Deal</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </ScrollView>
        )
    }

    _createDeal = async () => {
        const {description, image, title} = this.state;
        await this.props.createDealMutation({
            variables: {description, image, title}
        });
        this.props.onComplete()
    }
}


const styles = StyleSheet.create({
    ScrollContainer: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    container: {},
    addImageContainer: {
        backgroundColor: 'rgba(0,0,0,.03)',
    },
    addImage: {
        paddingTop: 30,
        paddingHorizontal: 20,
    },
    photoPlaceholderContainer: {
        alignItems: 'center',
        height: 80,
    },
    photoPlaceholder: {
        backgroundColor: 'rgba(42,126,211,.1)',
        height: 80,
        width: 80,
    },
    imageInput: {
        color: 'rgba(42,126,211,1)',
        height: 60,
    },
    descriptionInput: {
        paddingHorizontal: 20,
        height: 100,
        fontSize: 20,
    },
    reductionInput: {
        paddingHorizontal: 20,
        height: 100,
        fontSize: 20,
    },
    buttons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    saveButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(39,174,96,1)',
        height: 45,
        borderRadius: 2,
    },
    saveButtonText: {
        color: 'white',
    },
    cancelButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 45,
    },
    cancelButtonText: {
        color: 'rgba(0,0,0,.5)',
    },
});

export default graphql(createDealMutation, {name: 'createDealMutation'})(CreatePage)