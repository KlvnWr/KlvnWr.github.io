import './style.css'

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData.entries());

      // Mensagem de loading
      formStatus.textContent = 'Enviando...';
      formStatus.className = 'text-sm mt-2 text-gray-400 block transition-opacity';

      try {

        const response = await fetch('https://formspree.io/f/mojrbelz', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        if (!response.ok) throw new Error('Erro na requisição');

        // Simulação de delay de rede para demonstração
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Sucesso simulado
        console.log('Dados do formulário:', data);

        formStatus.textContent = 'Mensagem enviada com sucesso! (Envio Simulado)';
        formStatus.className = 'text-sm mt-2 text-green-500 block';
        contactForm.reset();

        // Esconde a mensagem depois de 5 segundos
        setTimeout(() => {
          formStatus.className = 'text-sm mt-2 hidden';
        }, 5000);

      } catch (error) {
        formStatus.textContent = 'Erro ao enviar a mensagem. Tente novamente.';
        formStatus.className = 'text-sm mt-2 text-red-500 block';
      }
    });
  }

  // Scroll Reveal Observer
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const revealElements = document.querySelectorAll('.reveal-element');
  revealElements.forEach(el => observer.observe(el));

  // --- LÓGICA DO MODAL DE PROJETOS ---
  
  // Dados dos Projetos (com base no TCC)
  const projectData = {
    metaverso: {
      title: "Portal Metaverso",
      semester: "1º Semestre",
      description: "Neste projeto, desenvolvemos uma página web informativa sobre as possibilidades do Metaverso, explorando temas como experiências imersivas, economia digital e colaboração global. O projeto integrou conhecimentos de três disciplinas, focando na usabilidade, design digital e criação de conteúdo voltado para a web.",
      knowledge: "Aprendemos a estruturar o HTML de forma semântica, separar a apresentação com CSS e aplicar conceitos de Design Digital (uso de cores, fontes e organização visual). Também desenvolvemos habilidades de redação voltada para a internet, criando textos escaneáveis e objetivos.",
      tech: ["HTML5", "CSS3", "Design Digital", "Photoshop"],
      image: "/tcc_images/image3.png"
    },
    redes: {
      title: "Projeto de Redes",
      semester: "2º Semestre",
      description: "Este projeto consistiu na simulação de uma topologia e infraestrutura de redes locais distribuída em setores, utilizando o Cisco Packet Tracer. Configuramos a comunicação entre switches via link trunk e conectamos servidores e clientes.",
      knowledge: "Aprofundamento nos conceitos de comunicação entre dispositivos, montagem de redes locais (LAN), configuração de switches e entendimento prático do tráfego de dados na rede.",
      tech: ["Cisco Packet Tracer", "Infraestrutura", "Redes"],
      image: "/tcc_images/image4.png"
    },
    banco_sangue: {
      title: "Banco de Sangue",
      semester: "3º Semestre",
      description: "Modelagem e criação de um banco de dados relacional completo para gerenciar doadores, estoque de sangue e movimentações de entrada/saída de bolsas.",
      knowledge: "Compreensão da modelagem entidade-relacionamento e criação do modelo físico. Domínio de comandos SQL para garantir integridade, chaves estrangeiras e relacionamentos lógicos em um banco estruturado.",
      tech: ["MySQL", "Modelagem de Dados", "SQL"],
      image: "/tcc_images/image7.png"
    },
    portfolio_figma: {
      title: "Análise de Portfólio",
      semester: "4º Semestre",
      description: "Desenvolvimento de um protótipo de alta fidelidade para apresentação profissional. O foco foi estruturar o layout, cores, tipografia e navegação interativa simulada.",
      knowledge: "Compreensão dos princípios de usabilidade, design centrado no usuário (DCU) e prototipagem. Testes de disposição de elementos, responsividade visual e transições interativas no Figma.",
      tech: ["Figma", "UX/UI Design", "Prototipagem"],
      image: "/portfolio-figma.png"
    },
    ecommerce: {
      title: "E-commerce Mobile",
      semester: "5º Semestre",
      description: "Aplicativo mobile de e-commerce construído para simular um fluxo completo de compras, incluindo catálogo de produtos e gerenciamento de carrinho.",
      knowledge: "Desenvolvimento híbrido/mobile, estruturação de componentes reutilizáveis, gerenciamento de estado da aplicação e consumo de dados para interfaces móveis.",
      tech: ["Ionic", "Angular", "TypeScript"]
    },
    nutridata: {
      title: "NutriData",
      semester: "6º Semestre",
      description: "Aplicativo mobile focado na saúde e bem-estar, projetado com uma interface limpa e amigável para o acompanhamento diário do consumo calórico, com adição de alimentos e acompanhamento de metas.",
      knowledge: "Criação de interfaces mobile intuitivas para saúde (UI/UX), implementação de lógicas de cálculo de calorias diárias e foco na melhor experiência de uso diário pelo usuário.",
      tech: ["Android Studio", "Java", "UI/UX"],
      image: "/nutridata.png"
    }
  };

  const modal = document.getElementById('project-modal');
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalContent = document.getElementById('modal-content');
  const closeModalBtn = document.getElementById('close-modal');
  
  const mTitle = document.getElementById('modal-title');
  const mSemester = document.getElementById('modal-semester');
  const mDesc = document.getElementById('modal-description');
  const mKnow = document.getElementById('modal-knowledge');
  const mTech = document.getElementById('modal-tech');
  const mImage = document.getElementById('modal-image');
  const mPlaceholder = document.getElementById('modal-image-placeholder');

  const openModal = (projectId) => {
    const data = projectData[projectId];
    if (!data) return;

    // Popula os dados
    mTitle.textContent = data.title;
    mSemester.textContent = data.semester;
    mDesc.textContent = data.description;
    mKnow.textContent = data.knowledge;
    
    // Configura a imagem ou o placeholder
    if (data.image) {
      mImage.src = data.image;
      mImage.classList.remove('hidden');
      mPlaceholder.classList.add('hidden');
    } else {
      mImage.src = '';
      mImage.classList.add('hidden');
      mPlaceholder.classList.remove('hidden');
    }
    
    // Limpa e recria as tags de tecnologia
    mTech.innerHTML = '';
    data.tech.forEach(t => {
      const span = document.createElement('span');
      span.className = 'px-3 py-1 bg-white/10 border border-white/10 rounded-md text-xs text-gray-300';
      span.textContent = t;
      mTech.appendChild(span);
    });

    // Exibe o modal
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    
    // Timeout pequeno para animação do Tailwind funcionar
    setTimeout(() => {
      modalBackdrop.classList.remove('opacity-0');
      modalContent.classList.remove('opacity-0', 'scale-95');
    }, 10);
    
    document.body.style.overflow = 'hidden'; // Previne rolagem do fundo
  };

  const closeModal = () => {
    modalBackdrop.classList.add('opacity-0');
    modalContent.classList.add('opacity-0', 'scale-95');
    
    // Espera a animação acabar para esconder de fato
    setTimeout(() => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      document.body.style.overflow = '';
    }, 300);
  };

  // Eventos de clique nos cards
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-project');
      openModal(id);
    });
  });

  // Eventos de clique para fechar
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

});
