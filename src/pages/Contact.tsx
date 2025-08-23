import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  PageComponent,
  getInitialPropsContext,
  getInitialPropsResult,
} from "../types/ssr";
import { usePageData } from "../App";

interface ContactProps {
  contactInfo?: {
    email: string;
    phone: string;
    address: string;
    workingHours: string;
  };
}

const Contact: PageComponent<ContactProps> = () => {
  const pageData = usePageData() as { props: ContactProps };
  const [contactInfo, setContactInfo] = useState<ContactProps["contactInfo"]>(
    pageData?.props?.contactInfo
  );

  if (typeof window !== "undefined" && !contactInfo) {
    getInitialProps({}).then((res) => {
      console.log("res", res);
      setContactInfo(res.props.contactInfo);
    });
  }

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

        {contactInfo && (
          <div
            style={{
              marginTop: "2rem",
              padding: "1.5rem",
              backgroundColor: "#f0f0f0",
              borderRadius: "8px",
              marginBottom: "2rem",
            }}
          >
            <h2 style={{ marginTop: 0, marginBottom: "1rem" }}>联系信息</h2>
            <div style={{ display: "grid", gap: "0.5rem" }}>
              <p>
                <strong>邮箱:</strong> {contactInfo.email}
              </p>
              <p>
                <strong>电话:</strong> {contactInfo.phone}
              </p>
              <p>
                <strong>地址:</strong> {contactInfo.address}
              </p>
              <p>
                <strong>工作时间:</strong> {contactInfo.workingHours}
              </p>
            </div>
          </div>
        )}

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

// 添加getInitialProps静态方法
async function getInitialProps(
  _context: getInitialPropsContext
): Promise<getInitialPropsResult<ContactProps>> {
  try {
    // 模拟获取联系信息
    await new Promise((resolve) => setTimeout(resolve, 50)); // 模拟API延迟

    const contactInfo = {
      email: "support@example.com",
      phone: "+86 400-123-4567",
      address: "北京市朝阳区xxx街道xxx号",
      workingHours: "周一至周五 9:00-18:00",
    };

    return {
      props: {
        contactInfo,
      },
      // 24小时重新验证一次
      revalidate: 86400,
    };
  } catch (error) {
    console.error("Error in Contact.getInitialProps:", error);

    return {
      props: {},
    };
  }
}

Contact.getInitialProps = getInitialProps;

export default Contact;
