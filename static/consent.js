if (!localStorage.getItem("consentGranted")) {
  const banner = document.createElement("div");
  banner.innerHTML = `
    <div style="position:fixed;bottom:0;left:0;right:0;
    background:#111;color:#fff;padding:15px;text-align:center;z-index:9999">
    Usamos cookies para anuncios.
    <button id="acceptCookies">Aceptar</button>
    </div>`;
  document.body.appendChild(banner);

  document.getElementById("acceptCookies").onclick = () => {
    gtag('consent', 'update', {
      ad_storage: 'granted',
      analytics_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted'
    });
    localStorage.setItem("consentGranted", "true");
    banner.remove();
  };
}
