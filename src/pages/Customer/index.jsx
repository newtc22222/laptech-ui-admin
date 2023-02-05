import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { getStringBackTime } from '../../utils/HandleTimer';

const gender = {
  MALE: 'Nam',
  FEMALE: 'Nữ',
  OTHER: 'Khác'
}

const Customer = () => {
  const auth = useSelector((state) => state.auth);
  if(auth.user) {
    return <Navigate to="/login"/>
  }

  const { data: users, loading, error } = useFetch("/users", { method: 'GET' });

  if(loading) {
    return (<p>Loading...</p>);
  }

  if(error) {
    return (<p>{error}</p>);
  }

  return (
    <div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Khách hàng</h1>
      </div>
      <div className="table-responsive">
        <table className="table table-sm table-hover">
          <thead className="bg-dark text-white">
            <tr>
              <th scope="col" className="p-2">Tên người dùng</th>
              <th scope="col" className="p-2">Số điện thoại</th>
              <th scope="col" className="p-2">Giới tính</th>
              <th scope="col" className="p-2">Ngày tạo tài khoản</th>
              <th scope="col" className="p-2">Cập nhật mới nhất</th>
              <th scope="col" className="p-2">Trạng thái tài khoản</th>
              <th scope="col" className="p-2">Thiết lập</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => {
              return (
                <tr key={index}>
                  <td className="ms-2">{user.name}</td>
                  <td className="ms-2">{user.phone}</td>
                  <td className="ms-2">{gender[user.gender]}</td>
                  <td className="ms-2">{user.createdDate}</td>
                  <td className="ms-2">{getStringBackTime(user.lastUpdatedDate)}</td>
                  <td className="ms-2"><p className="fw-bold text-success">Đang sử dụng</p></td>
                  <td className="ms-2"><button className="btn btn-danger">Khóa tài khoản</button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Customer;