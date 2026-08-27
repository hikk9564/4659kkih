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
          borderBottom: "1px solid #B9DFF5",
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
          {[
            ["소개", "#소개"],
            ["게시판", "/"],
            ["자캐", "#자캐"],
            ["선후관", "#선후관"],
            ["커미션", "#커미션"],
            ["기록", "#기록"],
            ["방명록", "#방명록"],
          ].map(([name, link]) => (
            <a
              key={name}
              href={link}
              style={{
                color: "#2878B5",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#F2C94C";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#2878B5";
              }}
            >
              {name}
            </a>
          ))}
        </nav>
      </header>

      <section
        style={{
          maxWidth: "1100px",
          margin: "70px auto 0",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "280px",
            background: "#FFFFFF",
            border: "1px solid #B9DFF5",
            borderRadius: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#5BB9E8",
            fontSize: "14px",
            overflow: "hidden",
          }}
        >
          HEADER IMAGE
        </div>
      </section>

      <section
        id="소개"
        style={{
          maxWidth: "1100px",
          margin: "50px auto 0",
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
          <br />
          테스트 2
        </p>
      </section>
    </main>
  );
}
