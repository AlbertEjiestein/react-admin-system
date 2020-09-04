import React, { Component } from 'react'
import { Card, Upload, Button, Spin } from 'antd';
import { connect } from 'react-redux'
import { changeAvatar } from '../../actions/user'
import axios from 'axios'

const mapStateToProps = state => {
  return {
    avatarUrl: state.user.avatar
  }
}

@connect(mapStateToProps,{ changeAvatar })
class Profile extends Component {
  constructor(){
    super()
    this.state = {
      isUploading: false
    }
  }

  handleUploadAvatar = ({file}) => {
    const formData = new FormData()
    formData.append("Token","f6e8be8def368b76cf4c896fcf8c0f259dc30f6b:DlksdbmPKQMo6HRGd0tXTptgnQ4=:eyJkZWFkbGluZSI6MTU5MDMzMDYwNCwiYWN0aW9uIjoiZ2V0IiwidWlkIjoiNzE5Njg5IiwiYWlkIjoiMTY5MTU4NCIsImZyb20iOiJmaWxlIn0=")
    formData.append("file",file)
    this.setState({
      isUploading: true
    })
    axios.post("http://up.imgapi.com/", formData)
      .then(resp => {
        if(resp.status === 200){
          this.props.changeAvatar(resp.data.linkurl)
        }
      })
      .finally(() => {
        this.setState({
          isUploading: false
        })
      })
  }

  render() {
    return (
      <Card
        title="个人设置"
        bordered={false}
      >
        <Upload
          showUploadList={false}
          customRequest={this.handleUploadAvatar}
        >
          <Spin
            spinning={this.state.isUploading}
          >
            {
              this.props.avatarUrl ? <img style={{width: 78, height: 78}} src={this.props.avatarUrl} alt="头像" /> : <Button>上传头像</Button>
            }
          </Spin>
        </Upload>
      </Card>
    )
  }
}

export default Profile