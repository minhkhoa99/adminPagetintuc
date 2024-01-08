import { Button, Form, Input, Space, Upload } from "antd"
import axios from "axios";
import Swal from "sweetalert"
import { UploadOutlined } from '@ant-design/icons';
import { useParams } from "react-router";



const UpdateImage = () => {


    const layout = {
        labelCol: {
          span: 8,
        },
        wrapperCol: {
          span: 16,
        },
      };

    const normFile = (e) => {
        if (Array.isArray(e)) {
          return e;
        }
        return e?.fileList;
      };
    const {id} = useParams();

    const onSubmit = (values) => {
        const formData = new FormData();
        formData.append("link", values?.user?.website);
        formData.append("file", values?.upload[0]?.originFileObj);
        axios.put(`http://localhost:8000/link/${id}`, formData)
        .then((data) => {
        if(data.data){
            Swal({
                position: 'top-end',
                icon: 'success',
                title: 'Your work has been saved',
                showConfirmButton: false,
                timer: 1500
              })
               setTimeout(() => {
                window.location.href = "/admin/image";
              }, 2000)
        }
        })
    }

    return(
        <Form
        {...layout}
        name="nest-messages"
        onFinish={onSubmit}
        style={{
          maxWidth: 600,
        }}
      >
        <Form.Item name={['user', 'website']} label="Website">
          <Input />
        </Form.Item>
        <Form.Item
          name="upload"
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload name="logo" action="/upload.do" listType="picture">
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            span: 12,
            offset: 6,
          }}
        >
          <Space>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button htmlType="reset">reset</Button>
          </Space>
        </Form.Item>
      </Form>
    )
}

export default UpdateImage;