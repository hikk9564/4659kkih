export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
      background: "#EAF6FF",
      color: "#234A68",
        padding: "60px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <header
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          borderBottom: "1px solid #3f3933",
          paddingBottom: "20px",
        }}
      >
        <h1
          style={{
            fontSize: "48px",
            margin: 0,
            letterSpacing: "-2px",
          }}
        >
          hikk9564
        </h1>

        <p
          style={{
            marginTop: "8px",
            fontSize: "14px",
            opacity: 0.7,
          }}
        >
          힉힉이집
        </p>
        <nav
  style={{
    marginTop: "25px",
    display: "flex",
    gap: "28px",
    fontSize: "14px",
  }}
>
  <a href="/" style={{ color: "#2878B5", textDecoration: "none" }}>
    HOME
  </a>

  <a href="#자캐" style={{ color: "#2878B5", textDecoration: "none" }}>
    자캐
  </a>

  <a href="#선후관" style={{ color: "#2878B5", textDecoration: "none" }}>
    선후관
  </a>
  <a href="#커미션" style={{ color: "#2878B5", textDecoration: "none" }}>
    커미션
  </a>
  <a href="#기록" style={{ color: "#2878B5", textDecoration: "none" }}>
    기록
  </a>
  <a href="#방명록" style={{ color: "#2878B5", textDecoration: "none" }}>
    방명록
  </a>
</nav>
      </header>

    <section
  style={{
    maxWidth: "1100px",
    margin: "80px auto 0",
    background: "#FFFFFF",
    padding: "50px",
    borderRadius: "20px",
    boxShadow: "0 10px 30px rgba(40, 120, 181, 0.08)",
  }}
>
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "400",
          }}
        >
          테스트 0
        </h2>

        <p
          style={{
            lineHeight: "1.8",
            maxWidth: "600px",
          }}
        >
         테스트 1
          <br />테스트 2
        </p>
      </section>
    </main>
  );
}
