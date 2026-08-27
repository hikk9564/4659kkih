export default function About() {
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
      {/* 상단 제목 */}
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
            fontSize: "42px",
            margin: 0,
            letterSpacing: "-2px",
          }}
        >
          ABOUT
        </h1>

        <p
          style={{
            marginTop: "8px",
            fontSize: "14px",
            opacity: 0.7,
          }}
        >
          힉힉이 소개
        </p>
      </header>

      {/* 개인 소개 */}
      <section
        style={{
          maxWidth: "1100px",
          margin: "50px auto 0",
          background: "#FFFFFF",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(40, 120, 181, 0.08)",
        }}
      >
        <h2 style={{ fontSize: "22px", fontWeight: "400" }}>
          PROFILE
        </h2>

        <p style={{ lineHeight: "1.8", fontSize: "15px" }}>
          {/* ✏️ 여기에 자기소개를 적으세요 */}
          안녕하세요! 힉힉이입니다.
          <br />
          그림 그리고 이것저것 기록하는 홈페이지입니다.
        </p>
      </section>

      {/* SNS */}
      <section
        style={{
          maxWidth: "1100px",
          margin: "30px auto 0",
          background: "#FFFFFF",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(40, 120, 181, 0.08)",
        }}
      >
        <h2 style={{ fontSize: "22px", fontWeight: "400" }}>
          SNS
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            marginTop: "20px",
          }}
        >
          {/* ✏️ href="" 안에 본인의 SNS 주소를 입력하세요 */}
          <a
            href=""
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#2878B5",
              textDecoration: "none",
            }}
          >
            Twitter →
          </a>

          {/* ✏️ 필요 없는 SNS는 삭제해도 됩니다 */}
          <a
            href=""
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#2878B5",
              textDecoration: "none",
            }}
          >
            Instagram →
          </a>
        </div>
      </section>

      {/* 성향표 */}
      <section
        style={{
          maxWidth: "1100px",
          margin: "30px auto 0",
          background: "#FFFFFF",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(40, 120, 181, 0.08)",
        }}
      >
        <h2 style={{ fontSize: "22px", fontWeight: "400" }}>
          성향표
        </h2>

        <p style={{ lineHeight: "1.8", fontSize: "15px" }}>
          {/* ✏️ 여기에 성향표 내용을 적으세요 */}
          그림 이야기와 자캐 이야기를 좋아합니다.
          <br />
          편하게 교류해주세요!
        </p>
      </section>

      {/* 홈으로 돌아가기 */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "40px auto 0",
        }}
      >
        <a
          href="/"
          style={{
            color: "#2878B5",
            textDecoration: "none",
            fontSize: "14px",
          }}
        >
          ← HOME
        </a>
      </div>
    </main>
  );
}
