(function(){
  const year = document.getElementById('year');
  if(year) year.textContent = new Date().getFullYear();

  // Mobile nav
  const toggle = document.querySelector('.nav__toggle');
  const menu = document.getElementById('navMenu');
  if(toggle && menu){
    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('isOpen');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      menu.classList.remove('isOpen');
      toggle.setAttribute('aria-expanded','false');
    }));
  }

  // Lead form: generate mailto (no backend)
  const form = document.getElementById('leadForm');
  if(form){
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = (data.get('name')||'').toString().trim();
      const company = (data.get('company')||'').toString().trim();
      const email = (data.get('email')||'').toString().trim();
      const message = (data.get('message')||'').toString().trim();
      const deadline = (data.get('deadline')||'').toString().trim();
      const stage = (data.get('stage')||'').toString().trim();

      const subject = encodeURIComponent(`[DAQ Insights] Solicitud de cotización — ${company || name || 'Consulta'}`);
      const body = encodeURIComponent(
`Hola,\n\nMe contacto para solicitar una cotización.\n\n`+
`Nombre: ${name}\nEmpresa: ${company}\nEmail: ${email}\n`+
`Etapa: ${stage}\nPlazo deseado: ${deadline || 'Sin urgencia'}\n\n`+
`Descripción del caso:\n${message || '(sin descripción)'}\n\n`+
`Checklist (si aplica):\n- Objetivo del análisis\n- Variables y unidades\n- Frecuencia de muestreo / canales\n- Archivos de datos (o muestra)\n- Descripción del setup\n\nSaludos.`
      );

      // TODO: Reemplazar por tu email real
      const to = 'zedlavolecram@gmail.com';
      window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    });
  }
})();
