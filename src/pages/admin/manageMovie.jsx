import React from 'react'
import {Table, TableBody, TableRow, TableCell, TableHead, Paper, Container} from '@material-ui/core'
import { DeleteForeverRounded , EditAttributesRounded  } from '@material-ui/icons'
import { Modal, ModalBody, ModalHeader, ModalFooter, FormGroup, Label, Input } from 'reactstrap'
import Axios from 'axios';
// import { throwStatement } from '@babel/types';



class ManageMovie extends React.Component{
     //state
    state = {data : [], modalOpen : false , selectedEdit : 0}

     //lifecycle
    componentDidMount(){
        Axios.get('http://localhost:2000/movies')
        .then((res) => {
            this.setState({data : res.data})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    //functions

    RenderSinopsis = (text) => {
        var arr = text.split(' ')
        var newArr = []
        for(var i = 0 ; i < 5 ; i++){
            newArr.push(arr[i])
        }

        return newArr.join(' ')
    }

    onBtnDeleteClick = (id,index) => {
        var konfirm = window.confirm('Are You Sure want To Delete this data?')
        if(konfirm === true){
            Axios.delete('http://localhost:2000/movies/' + id)
            .then((res) => {
                alert('Delete Data Success')
                var data = this.state.data
                data.splice(index , 1)
                this.setState({data : data})

            })
            .catch((err) =>{

            })
        }
    }

    onBtnEditClick = (id) => {
        this.setState({selectedEdit : id})
    }

    onBtnSaveEditClick = () => {
        var title = this.refs.input1.value
        var sutradara = this.refs.input2.value
        var image = this.refs.input3.value
        var genre = this.refs.input4.value
        var playingAt = this.refs.input5.value.split(',')
        var duration = this.refs.input6.value
        var sinopsis = this.refs.input7.value

        if(title === '' || 
           sutradara === '' || 
           image === '' || 
           genre === '' || 
           playingAt.length <= 0 ||
           duration <= 0 ||
           sinopsis ==='')
           {
               alert('Isi Form Dengan Benar')
           }
        else{
            var data = {
                title, sutradara,image,genre,playingAt,duration,sinopsis
            }
            Axios.put('http://localhost:2000/movies/' +this.state.selectedEdit ,data )
            .then((res)=>{
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
        } 
        
        
        // Get Semua Data Dari Input
        // Kirim Ke JSON

    }
 
    renderDataToJsx = () => {
        var jsx = this.state.data.map((val, index) =>{
            if(val.id === this.state.selectedEdit){
                return(
                    <TableRow>
                    <TableCell>{val.id}</TableCell>
                    <TableCell><input ref='input1' className='form-control' type='text' defaultValue={val.title} />  </TableCell>
                    <TableCell><input ref='input2' className='form-control' type='text' defaultValue={val.sutradara} /> </TableCell>
                    <TableCell><input ref='input3' className='form-control' type='text' defaultValue={val.image} /> </TableCell>
                    <TableCell><input ref='input4' className='form-control' type='text' defaultValue={val.genre} /> </TableCell>
                    <TableCell><input ref='input5' className='form-control' type='text' defaultValue={val.playingAt} /> </TableCell>
                    <TableCell><input ref='input6' className='form-control' type='text' defaultValue={val.duration} /> </TableCell>
                    <TableCell><textarea ref='input7' className='form-control' defaultValue={val.sinopsis}  /></TableCell>
                    <TableCell><input type='button' className='btn btn-danger' value='cancel' onClick={() => this.setState({selectedEdit : 0})} /> </TableCell>
                    <TableCell><input type='button' className='btn btn-success' value='save' onClick={this.onBtnSaveEditClick} /> </TableCell>
                </TableRow>
                )
            }
            return(
                <TableRow>
                    <TableCell>{val.id}</TableCell>
                    <TableCell>{val.title}</TableCell>
                    <TableCell>{val.sutradara}</TableCell>
                    <TableCell><img src= {val.image} height = '50px' alt='movie' /> </TableCell>
                    <TableCell>{val.genre}</TableCell>
                    <TableCell>{val.playingAt.join(',')}</TableCell>
                    <TableCell>{val.duration}</TableCell>
                    <TableCell>{this.RenderSinopsis(val.sinopsis) + '....'}</TableCell>
                    <TableCell><EditAttributesRounded onClick={() => this.onBtnEditClick(val.id)} /> </TableCell>
                    <TableCell><DeleteForeverRounded onClick={() => this.onBtnDeleteClick(val.id , index)} /> </TableCell>
                </TableRow>
            )
        })
        return jsx
    }

    closeModal = () => {
        this.setState({modalOpen : false})
    }
    openModal = () => {
        this.setState({modalOpen : true})
    }

    onBtnSaveClick = () => {
        var playingAt = []

        if(this.refs.radio1.refs.radio1Inner.checked === true){
            playingAt.push(9)
        }
        if(this.refs.radio2.refs.radio2Inner.checked === true){
            playingAt.push(14)
        }
        if(this.refs.radio3.refs.radio3Inner.checked === true){
            playingAt.push(16)
        }
        if(this.refs.radio4.refs.radio4Inner.checked === true){
            playingAt.push(20)
        }
        if(this.refs.radio5.refs.radio5Inner.checked === true){
            playingAt.push(22)
        }

        // var jam = [9,14,16,20,22]
        // var playingAt = []
        // for(var i = 1 ; i <= 5 ; i++){
        //     if(this.refs['radio'])
        // }

        
        var title = this.refs.title.value
        var sutradara = this.refs.sutradara.value
        var genre = this.refs.genre.value
        var imageLink = this.refs.imageLink.value
        var duration = this.refs.duration.value
        var sinopsis = this.refs.sinopsis.value

        var data = {
            title : title,
            genre : genre,
            sinopsis : sinopsis,
            playingAt : playingAt,
            duration : duration,
            sutradara,
            image : imageLink

        }
        if(title !== '' && sutradara !== '' && playingAt.length >0 && genre !== '' && imageLink !== '' && duration >0 && sinopsis !== '' ){
        
        Axios.post('http://localhost:2000/movies' , data)
        .then((res) => {
            alert('Add Data Success')
            var movieData = this.state.data
            movieData.push(res.data)
            this.setState({data : movieData, modalOpen : false})
        })
        .catch((err) => {
            console.log(err)
        })
    }else{
        alert('semua data harus diisi')
    }

    }
    //render
    render(){
        return(
            <Container fixed>
                <h1>Manage Movie Page</h1>
                <input type='button' className='btn btn-success mb-3' value='Add Data' onClick={() => this.setState({modalOpen : true})} />
                

                <Modal isOpen={this.state.modalOpen} toggle={this.closeModal}>
                    <ModalHeader>
                        Add Movie
                    </ModalHeader>
                    <ModalBody>
                        <input ref='title' type='text' className='form-control mt-2' placeholder='Title' />
                        <input ref='sutradara' type='text' className='form-control mt-2' placeholder='Sutradara' />
                        <input ref='genre' type='text' className='form-control mt-2' placeholder='Genre' />
                        <input ref='imageLink' type='text' className='form-control mt-2' placeholder='Image' />
                        <div className='mt-3'>
                            <FormGroup check inline>
                                <Label>
                                    Playing At :
                                </Label>
                            </FormGroup>
                            <FormGroup check inline>
                                <Label check>
                                    <Input ref='radio1' innerRef='radio1Inner' type='radio'/> 09.00
                                </Label>
                            </FormGroup>
                            <FormGroup check inline>
                                <Label check>
                                    <Input ref='radio2' innerRef='radio2Inner' type='radio'/> 14.00
                                </Label>
                            </FormGroup>
                            <FormGroup check inline>
                                <Label check>
                                    <Input ref='radio3' innerRef='radio3Inner' type='radio'/> 16.00
                                </Label>
                            </FormGroup>
                            <FormGroup check inline>
                                <Label check>
                                    <Input ref='radio4' innerRef='radio4Inner' type='radio'/> 20.00
                                </Label>
                            </FormGroup>
                            <FormGroup check inline>
                                <Label check>
                                    <Input ref='radio5' innerRef='radio5Inner' type='radio'/> 22.00
                                </Label>
                            </FormGroup>
                        </div>
                        <input ref='duration' type='number' className='form-control mt-2' placeholder='Duration' />
                        <textarea ref='sinopsis' placeholder='sinopsis' className='form-control mt-2' />
                    </ModalBody>
                    <ModalFooter>
                        <input type='button' onClick={this.closeModal} value='cancel' className='btn btn-danger' />
                        <input type='button' onClick={this.onBtnSaveClick} value='save' className='btn btn-success' />
                    </ModalFooter>
                </Modal>
                <Paper>
                    <Table>
                        <TableHead>
                            <TableCell>No</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Sutradara</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>Genre</TableCell>
                            <TableCell>Played At</TableCell>
                            <TableCell>Duration</TableCell>
                            <TableCell>Sinopsis</TableCell>
                            <TableCell>Action</TableCell>
                        </TableHead>
                        <TableBody>
                            {/* <TableRow>
                            <TableCell>1</TableCell>
                            <TableCell>ANNABELLE COMES HOME</TableCell>
                            <TableCell>Gary Dauberman</TableCell>
                            <TableCell><img src= 'https://media.21cineplex.com/webcontent/gallery/pictures/156074568118284_452x647.jpg' width = '50px' /> </TableCell>
                            <TableCell>Horror</TableCell>
                            <TableCell>{[9,14,20].join(',')}</TableCell>
                            <TableCell>106</TableCell>
                            <TableCell>Pasangan suami istri Ed Warren (Patrick Wilson) dan Lorraine Warren (Vera Farmiga) sepakat untuk meletakkan boneka Annabelle di ruang khusus mereka. Dibalik lemari kaca suci dan mendapat berkat dari seorang pendeta. Namun malapetaka datang saat Annabelle membangunkan roh-roh jahat yang ada di ruangan itu. Putri pasangan ini, Judy Warren (Mckenna Grace) dan temannya menjadi target teror baru Annabelle dan iblis jahat lainnya.</TableCell>
                            <TableCell>Action</TableCell>
                            </TableRow> */}
                            {this.renderDataToJsx()}
                        </TableBody>
                    </Table>
                </Paper>
            </Container>
        )
    }
}


export default ManageMovie