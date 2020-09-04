import React, { Component } from 'react'
import { Card, Button, Table, Tag, Modal, message, Tooltip } from 'antd'
import moment from 'moment'
import XLSX from 'xlsx'
import {
  getArticles,
  deleteArticleById
} from '../../requests'

const titleDisplayMap = {
  'id': 'id',
  'title': '标题',
  'amount': '阅读量',
  'author': '作者',
  'createAt': '创建日期'
}

const ButtonGroup = Button.Group

export default class Article extends Component {
  constructor(){
    super()
    this.state = {
      dataSource: [],
      columns: [],
      total: 1,
      isLoading: false,
      offset: 0,
      limited: 10,
      deleteArticleTitle: '',
      isShowArticleModal: false,
      deleteArticleConfirmLoading: false,
      deleteArticleID: null
    }
  }

  showDeleteArticleModal = (record) => {
    // Modal.confirm({
    //   icon: <ExclamationCircleOutlined />,
    //   title: <Typography>你确定要删除<span style={{color: '#f00'}}>{record.title}</span>吗？</Typography>,
    //   content: `此操作不可逆，请谨慎！`,
    //   okText: '别墨迹！赶紧删除！',
    //   cancelText: '我点错了',
    //   onOk(){
    //     deleteArticleById(record.id)
    //       .then(resp => {
    //         console.log(resp)
    //       })
    //   }
    // })
    this.setState({
      deleteArticleTitle: record.title,
      isShowArticleModal: true,
      deleteArticleID: record.id
    })
  }

  toEdit = (id) => {
    this.props.history.push(`/admin/article/edit/${id}`)
  }

  createColumns = (columnKeys) => {
    const columns = columnKeys.map(item => {
      if(item === 'amount'){
        return {
          title: titleDisplayMap[item],
          key: item,
          render: (text) => {
            const { amount } = text;
            return (
              <Tooltip title={amount > 230 ? '超过230': '未超过230'}>
                <Tag color={amount > 230 ? 'red': 'green'}>{amount}</Tag>
              </Tooltip>
            )
          }
        }
      }
      if(item === 'createAt'){
        return {
          title: titleDisplayMap[item],
          key: item,
          render: (text) => {
            const { createAt } = text;
            return moment(createAt).format('YYYY年MM月DD日 HH:mm:ss')
          }
        }
      }
      return {
        title: titleDisplayMap[item],
        dataIndex: item,
        key: item
      }
    })
    columns.push({
      title: '操作',
      key: 'action',
      render: (text, record) => {
        return (
          <ButtonGroup>
            <Button size="small" type="primary" onClick={this.toEdit.bind(this, record.id)}>编辑</Button>
            <Button size="small" type="danger" onClick={this.showDeleteArticleModal.bind(this, record)}>删除</Button>
          </ButtonGroup>
        )
      }
    })
    return columns
  }

  hideDeleteModal = () => {
    this.setState({
      isShowArticleModal: false,
      deleteArticleTitle: '',
      deleteArticleConfirmLoading: false
    })
  }

  deleteArticle = () => {
    this.setState({
      deleteArticleConfirmLoading: true
    })
    deleteArticleById(this.state.deleteArticleID)
      .then(resp => {
        message.success(resp.msg)
        // 此处沟通的时候，要确定是留在当前页还是第一页
        this.setState({
          offset: 0
        },() => {
          this.getData()
        })
      })
      .finally(() => {
        this.setState({
          deleteArticleConfirmLoading: false
        })
      })
  }

  getData = () => {
    this.setState({
      isLoading: true
    })
    return getArticles(this.state.offset, this.state.limited)
      .then(resp => {
        const columnKeys = Object.keys(resp.list[0]);
        const columns = this.createColumns(columnKeys);
        if(!this.updater.isMounted(this)) return
        this.setState({
          columns: columns,
          dataSource: resp.list,
          total: resp.total
        })
      })
      .catch(err => {
        // 处理错误
      })
      .finally(() => {
        if(!this.updater.isMounted(this)) return
        this.setState({
          isLoading: false
        })
      })
  }

  onPageChange = (page, pageSize) => {
    this.setState({
      offset: pageSize * (page - 1),
      limited: pageSize
    },() => {
      this.getData()
    })
  }

  onShowSizeChange = (current, size) => {
    console.log(current, size)
    this.setState({
      offset: 0,
      limited: size
    },() => {
      this.getData()
    })
  }

  toExcel = () => {
    let data = [Object.keys(this.state.dataSource[0])]
    // data = this.state.dataSource.reduce((result, current) => {
    //   return [...result,Object.values(current)]
    // }, data)
    for(let i = 0; i < this.state.dataSource.length; i++){
      data.push([
        this.state.dataSource[i].id,
        this.state.dataSource[i].title,
        this.state.dataSource[i].author,
        this.state.dataSource[i].amount,
        moment(this.state.dataSource[i].createAt).format('YYYY年MM月DD日 HH:mm:ss')
      ])
    }
    const ws = XLSX.utils.aoa_to_sheet(data)
		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
		/* generate XLSX file and send to client */
		XLSX.writeFile(wb, `article-${this.state.offset / this.state.limited + 1}-${moment().format('YYYYMMDDHHmmss')}.xlsx`)
  }

  componentDidMount(){
    this.getData()
  }

  render() {
    return (
      <Card title="文章列表" extra={<Button onClick={this.toExcel}>导出excel</Button>}>
        <Table
          rowKey={record => record.id}
          loading={this.state.isLoading}
          dataSource={this.state.dataSource}
          columns={this.state.columns}
          pagination={{
            current: this.state.offset / this.state.limited + 1,
            hideOnSinglePage:true,
            total: this.state.total,
            showQuickJumper: true,
            onChange: this.onPageChange,
            onShowSizeChange: this.onShowSizeChange
          }}
        />
        <Modal
          title="Modal"
          visible={this.state.isShowArticleModal}
          onCancel={this.hideDeleteModal}
          confirmLoading={this.state.deleteArticleConfirmLoading}
          onOk={this.deleteArticle}
          maskClosable={false}
        >
          {this.state.deleteArticleTitle}
        </Modal>
      </Card>
    )
  }
}
