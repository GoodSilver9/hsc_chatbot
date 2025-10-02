(function () {
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);
  const widgetUrl = "https://chatbot2-zvbd.vercel.app"; // 실제 Next.js 앱 URL

  // 챗봇 열기 함수 (글로벌 노출)
  window.openChatWidget = function () {
    // 이미 열려있으면 무시
    if (window.__tenswChatOpen) return;
    // 이미 위젯이 있으면 바로 열기
    let widgetWrapper = document.getElementById("supernova-widget-wrapper");
    let iframeWrapper = document.getElementById("custom-widget-iframe-wrapper");
    let overlay = document.getElementById("custom-widget-overlay");
    if (!widgetWrapper) {
      widgetWrapper = document.createElement("div");
      widgetWrapper.id = "supernova-widget-wrapper";
      widgetWrapper.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 2147483647;
        pointer-events: auto;
      `;
      document.documentElement.appendChild(widgetWrapper);
    } else {
      // pointer-events가 none으로 남아있을 수 있으니 항상 auto로 설정
      widgetWrapper.style.pointerEvents = "auto";
    }
    // 오버레이 없으면 생성
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "custom-widget-overlay";
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 2147483645;
        display: none;
        transition: opacity 0.3s ease;
      `;
      document.body.appendChild(overlay);
    }
    // iframeWrapper 없으면 생성
    if (!iframeWrapper) {
      iframeWrapper = document.createElement("div");
      iframeWrapper.id = "custom-widget-iframe-wrapper";
      const iframe = document.createElement("iframe");
      iframe.id = "custom-widget-iframe";
      iframe.src = widgetUrl + "?widget=true";
      iframe.sandbox =
        "allow-scripts allow-popups allow-forms allow-same-origin allow-top-navigation";
      iframe.style.cssText = `
        width: 400px;
        height: 650px;
        border: none;
        border-radius: 12px;
        background-color: white;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
      `;
      iframeWrapper.appendChild(iframe);
      widgetWrapper.appendChild(iframeWrapper);
    } else {
      iframeWrapper.style.display = "flex";
    }
    overlay.style.display = "block";
    iframeWrapper.style.display = "flex";
    window.__tenswChatOpen = true;
    // 오버레이 클릭 시 닫기
    overlay.onclick = function () {
      iframeWrapper.style.display = "none";
      overlay.style.display = "none";
      window.__tenswChatOpen = false;
    };
  };

  // init 함수에서 버튼 생성 코드를 모두 제거하여, 고정 버튼이 생성되지 않도록 함
  function init() {
    // 아무것도 하지 않음
  }

  // Check if DOM is already loaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init(); // Execute immediately if DOM is already loaded
  }
})();
