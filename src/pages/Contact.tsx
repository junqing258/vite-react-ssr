import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const Contact: React.FC = () => {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("感谢您的留言！这是一个演示表单。");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <>
      <Helmet>
        <title>联系我们 - Vite React SSR</title>
        <meta
          name="description"
          content="如果您有任何问题或建议，请随时与我们联系。填写表单发送留言给我们。"
        />
        <meta name="keywords" content="联系我们, 反馈, 留言, 问题咨询" />
        <meta property="og:title" content="联系我们 - Vite React SSR" />
        <meta
          property="og:description"
          content="如果您有任何问题或建议，请随时与我们联系。填写表单发送留言给我们。"
        />
        <link rel="canonical" href="/contact" />
      </Helmet>
      <div className="container mx-auto px-4 md:px-0">
        <h1>联系我们</h1>
        <p>如果您有任何问题或建议，请随时与我们联系。</p>

        <form onSubmit={handleSubmit} style={{ marginTop: "2rem" }}>
          <div style={{ marginBottom: "1rem" }}>
            <label
              htmlFor="name"
              style={{ display: "block", marginBottom: "0.5rem" }}
            >
              姓名:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "0.5rem",
                fontSize: "1rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label
              htmlFor="email"
              style={{ display: "block", marginBottom: "0.5rem" }}
            >
              邮箱:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "0.5rem",
                fontSize: "1rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label
              htmlFor="message"
              style={{ display: "block", marginBottom: "0.5rem" }}
            >
              留言:
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              style={{
                width: "100%",
                padding: "0.5rem",
                fontSize: "1rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
                resize: "vertical",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              padding: "0.75rem 2rem",
              fontSize: "1rem",
              backgroundColor: "#646cff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            发送留言
          </button>
        </form>

        <div style={{ marginTop: "2rem" }}>
          <Link to="/" style={{ color: "#646cff", textDecoration: "none" }}>
            ← 返回首页
          </Link>
        </div>
      </div>
    </>
  );
};

export default Contact;
