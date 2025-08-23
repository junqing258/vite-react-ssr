import { useUserStore } from "../store/userStore";

// 用户状态组件
const UserStatus: React.FC = () => {
  const { id: userId, name, email, login, logout } = useUserStore();

  const handleLogin = () => {
    login({
      id: "1",
      name: "张三",
      email: "zhangsan@example.com",
    });
  };

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-semibold mb-4">用户状态示例</h3>
      {userId ? (
        <div>
          <p className="mb-2">欢迎，{name}!</p>
          <p className="mb-4 text-gray-600">{email}</p>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            退出登录
          </button>
        </div>
      ) : (
        <div>
          <p className="mb-4">请先登录</p>
          <button
            onClick={handleLogin}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            登录
          </button>
        </div>
      )}
    </div>
  );
};

export default UserStatus;
