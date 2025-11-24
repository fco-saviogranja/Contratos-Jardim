function Container() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#e6f7ee] text-[16px] w-[128.66px]">
        <p className="leading-[normal]">ContratosJardim</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <div className="bg-[#0b6b3a] rounded-[6px] shrink-0 size-[32px]" data-name="Background" />
      <Container1 />
    </div>
  );
}

function VerticalBorder() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pl-[17px] pr-0 py-0 relative shrink-0" data-name="VerticalBorder">
      <div aria-hidden="true" className="absolute border-[0px_0px_0px_1px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#e6f7ee] text-[16px] w-[310.92px]">
        <p className="leading-[normal]">Sistema de Gestão de Contratos Internos</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="Container">
      <Container2 />
      <VerticalBorder />
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#e6f7ee] text-[12px] w-[32.98px]">
        <p className="leading-[normal]">Ajuda</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[13px] w-[68.31px]">
        <p className="leading-[normal]">Maria Silva</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-gray-500 w-[110.28px]">
        <p className="leading-[normal]">Administrador (CGM)</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container5 />
      <Container6 />
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[22.23px]">
        <p className="leading-[normal]">Sair</p>
      </div>
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#e9f7ee] box-border content-stretch flex gap-[8px] items-center px-[10px] py-[6px] relative rounded-[8px] shrink-0" data-name="Background">
      <div className="bg-[#0b6b3a] rounded-[999px] shrink-0 size-[24px]" data-name="Background" />
      <Container7 />
      <Container8 />
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="Container">
      <Container4 />
      <Background />
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-[#0a4e33] relative shrink-0 w-full" data-name="Background">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center justify-between px-[32px] py-[8px] relative w-full">
          <Container3 />
          <Container9 />
        </div>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#e6f7ee] text-[11px] w-[45.84px]">
        <p className="leading-[normal]">Principal</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[67.8px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin justify-center leading-[0] not-italic relative shrink-0 text-[#e6f7ee] text-[13px] w-[67.8px]">
        <p className="leading-[normal]">Dashboard</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center px-[10px] py-[6px] relative rounded-[6px] shrink-0" data-name="Container">
      <div className="shrink-0 size-[16px]" data-name="Rectangle" />
      <Container11 />
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[96.89px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin justify-center leading-[0] not-italic relative shrink-0 text-[#e6f7ee] text-[13px] w-[96.89px]">
        <p className="leading-[normal]">Meus contratos</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center px-[10px] py-[6px] relative rounded-[6px] shrink-0" data-name="Container">
      <div className="shrink-0 size-[16px]" data-name="Rectangle" />
      <Container13 />
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[100.78px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin justify-center leading-[0] not-italic relative shrink-0 text-[#e6f7ee] text-[13px] w-[100.78px]">
        <p className="leading-[normal]">Todos contratos</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center px-[10px] py-[6px] relative rounded-[6px] shrink-0" data-name="Container">
      <div className="shrink-0 size-[16px]" data-name="Rectangle" />
      <Container15 />
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[131.09px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin justify-center leading-[0] not-italic relative shrink-0 text-[#e6f7ee] text-[13px] w-[131.09px]">
        <p className="leading-[normal]">Cadastro de contrato</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center px-[10px] py-[6px] relative rounded-[6px] shrink-0" data-name="Container">
      <div className="shrink-0 size-[16px]" data-name="Rectangle" />
      <Container17 />
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[101.11px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin justify-center leading-[0] not-italic relative shrink-0 text-[#e6f7ee] text-[13px] w-[101.11px]">
        <p className="leading-[normal]">Alertas e prazos</p>
      </div>
    </div>
  );
}

function Background2() {
  return (
    <div className="bg-[#f0f4f8] box-border content-stretch flex flex-col items-start px-[6px] py-0 relative rounded-[999px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-gray-500 w-[6.64px]">
        <p className="leading-[normal]">5</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center px-[10px] py-[6px] relative rounded-[6px] shrink-0" data-name="Container">
      <div className="shrink-0 size-[16px]" data-name="Rectangle" />
      <Container19 />
      <Background2 />
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Container">
      <Container12 />
      <Container14 />
      <Container16 />
      <Container18 />
      <Container20 />
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="Container">
      <Container10 />
      <Container21 />
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-gray-500 w-[52.42px]">
        <p className="leading-[normal]">Relatórios</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[61.95px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin justify-center leading-[0] not-italic relative shrink-0 text-[#e6f7ee] text-[13px] w-[61.95px]">
        <p className="leading-[normal]">Relatórios</p>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center px-[10px] py-[6px] relative rounded-[6px] shrink-0" data-name="Container">
      <div className="shrink-0 size-[16px]" data-name="Rectangle" />
      <Container24 />
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Container">
      <Container25 />
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="Container">
      <Container23 />
      <Container26 />
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#e6f7ee] text-[11px] w-[135.95px]">
        <p className="leading-[normal]">Administração do sistema</p>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[117.53px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin justify-center leading-[0] not-italic relative shrink-0 text-[#e6f7ee] text-[13px] w-[117.53px]">
        <p className="leading-[normal]">Gerenciar usuários</p>
      </div>
    </div>
  );
}

function Background3() {
  return (
    <div className="bg-[#f0f4f8] box-border content-stretch flex flex-col items-start pl-[6px] pr-[12.23px] py-0 relative rounded-[999px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[24px] justify-center leading-[normal] not-italic relative shrink-0 text-[10px] text-gray-500 w-[36.24px]">
        <p className="mb-0">Apenas</p>
        <p>Admin</p>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center px-[10px] py-[6px] relative rounded-[6px] shrink-0" data-name="Container">
      <div className="h-[16px] shrink-0 w-[9.77px]" data-name="Rectangle" />
      <Container29 />
      <Background3 />
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[122px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin justify-center leading-[0] not-italic relative shrink-0 text-[#e6f7ee] text-[13px] w-[122px]">
        <p className="leading-[normal]">Parâmetros e perfis</p>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center px-[10px] py-[6px] relative rounded-[6px] shrink-0" data-name="Container">
      <div className="shrink-0 size-[16px]" data-name="Rectangle" />
      <Container31 />
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[115.52px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-white w-[115.52px]">
        <p className="leading-[normal]">Aparência e layout</p>
      </div>
    </div>
  );
}

function Background4() {
  return (
    <div className="bg-[#0d612f] box-border content-stretch flex gap-[8px] items-center px-[10px] py-[6px] relative rounded-[6px] shrink-0" data-name="Background">
      <div className="shrink-0 size-[16px]" data-name="Rectangle" />
      <Container33 />
    </div>
  );
}

function Container34() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[133.47px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin justify-center leading-[0] not-italic relative shrink-0 text-[#e6f7ee] text-[13px] w-[133.47px]">
        <p className="leading-[normal]">Configurações gerais</p>
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center px-[10px] py-[6px] relative rounded-[6px] shrink-0" data-name="Container">
      <div className="shrink-0 size-[16px]" data-name="Rectangle" />
      <Container34 />
    </div>
  );
}

function Container36() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Container">
      <Container30 />
      <Container32 />
      <Background4 />
      <Container35 />
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="Container">
      <Container28 />
      <Container36 />
    </div>
  );
}

function Container38() {
  return (
    <div className="content-stretch flex gap-[24px] items-end relative shrink-0" data-name="Container">
      <Container22 />
      <Container27 />
      <Container37 />
    </div>
  );
}

function Border() {
  return (
    <div className="box-border content-stretch flex items-center px-[13px] py-[7px] relative rounded-[6px] shrink-0" data-name="Border">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[48px] justify-center leading-[normal] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[71.14px]">
        <p className="mb-0">Editar</p>
        <p className="mb-0">parâmetros</p>
        <p>de alertas</p>
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="content-stretch flex items-end justify-between relative shrink-0 w-[1768.16px]" data-name="Container">
      <Container38 />
      <Border />
    </div>
  );
}

function Background5() {
  return (
    <div className="bg-[#0a4e33] relative shrink-0 w-full" data-name="Background">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col items-start pb-[8px] pt-0 px-[32px] relative w-full">
          <Container39 />
        </div>
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[21px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[18px] w-[159.45px]">
        <p className="leading-[normal]">Aparência e layout</p>
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[11px] w-[209.16px]">
        <p className="leading-[normal]">Acesso exclusivo: Administrador (CGM)</p>
      </div>
    </div>
  );
}

function Background6() {
  return (
    <div className="bg-[#e9f7ee] box-border content-stretch flex gap-[6px] items-center px-[8px] py-[2px] relative rounded-[6px] shrink-0" data-name="Background">
      <div className="bg-[#0b6b3a] rounded-[999px] shrink-0 size-[14px]" data-name="Background" />
      <Container41 />
    </div>
  );
}

function Container42() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Container">
      <Container40 />
      <Background6 />
    </div>
  );
}

function Container43() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-gray-500 w-[425.86px]">
        <p className="leading-[normal]">Ajuste tema visual, densidade e elementos de navegação do sistema.</p>
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="Container">
      <Container42 />
      <Container43 />
    </div>
  );
}

function Border1() {
  return (
    <div className="box-border content-stretch flex items-center px-[13px] py-[7px] relative rounded-[6px] shrink-0" data-name="Border">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[156.41px]">
        <p className="leading-[normal]">Ver como usuário padrão</p>
      </div>
    </div>
  );
}

function Container45() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container44 />
      <Border1 />
    </div>
  );
}

function Container46() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[17px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[14px] w-[113.08px]">
        <p className="leading-[normal]">Tema do sistema</p>
      </div>
    </div>
  );
}

function Container47() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 w-[309.98px]">
        <p className="leading-[normal]">Selecione o tema padrão aplicado a todos os usuários.</p>
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container46 />
      <Container47 />
    </div>
  );
}

function Margin() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[4px] pt-0 px-0 relative shrink-0 w-full" data-name="Margin">
      <Container48 />
    </div>
  );
}

function Container49() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[110.27px]">
        <p className="leading-[normal]">Modo de exibição</p>
      </div>
    </div>
  );
}

function Container50() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 w-[418.98px]">
        <p className="leading-[normal]">Ajuste o contraste do sistema para acompanhar o portal da Controladoria.</p>
      </div>
    </div>
  );
}

function Background7() {
  return (
    <div className="bg-[#e9f7ee] box-border content-stretch flex flex-col items-start px-[8px] py-[4px] relative rounded-[999px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[63.05px]">
        <p className="leading-[normal]">Tema claro</p>
      </div>
    </div>
  );
}

function Background8() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col items-start px-[8px] py-[4px] relative rounded-[999px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 w-[73.94px]">
        <p className="leading-[normal]">Tema escuro</p>
      </div>
    </div>
  );
}

function Background9() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col items-start px-[8px] py-[4px] relative rounded-[999px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 w-[198.67px]">
        <p className="leading-[normal]">Seguir configuração do navegador</p>
      </div>
    </div>
  );
}

function Container51() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Container">
      <Background7 />
      <Background8 />
      <Background9 />
    </div>
  );
}

function Margin1() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-0 pt-[4px] px-0 relative shrink-0 w-full" data-name="Margin">
      <Container51 />
    </div>
  );
}

function Background10() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col gap-[4px] items-start p-[8px] relative rounded-[6px] shrink-0" data-name="Background">
      <div className="bg-[#e9f7ee] h-[10px] rounded-[4px] shrink-0 w-[74.39px]" data-name="Background" />
      <div className="bg-[#f0f4f8] h-[6px] rounded-[4px] shrink-0 w-full" data-name="Background" />
      <div className="bg-[#f0f4f8] h-[6px] rounded-[4px] shrink-0 w-[99.19px]" data-name="Background" />
    </div>
  );
}

function Background11() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col gap-[4px] items-start pl-[8px] pr-[45.2px] py-[8px] relative rounded-[6px] shrink-0" data-name="Background">
      <div className="bg-[#0a4e33] h-[40px] rounded-[4px] shrink-0 w-[34.72px]" data-name="Background" />
      <div className="bg-[#f0f4f8] h-[6px] rounded-[4px] shrink-0 w-[86.8px]" data-name="Background" />
    </div>
  );
}

function Container52() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <Background10 />
      <Background11 />
    </div>
  );
}

function Margin2() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-0 pt-[8px] px-0 relative shrink-0 w-full" data-name="Margin">
      <Container52 />
    </div>
  );
}

function Container53() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-gray-500 w-[448.8px]">
        <p className="leading-[normal]">Usuários poderão ajustar preferências individuais sem impactar o padrão institucional.</p>
      </div>
    </div>
  );
}

function Margin3() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-0 pt-[4px] px-0 relative shrink-0 w-full" data-name="Margin">
      <Container53 />
    </div>
  );
}

function Background12() {
  return (
    <div className="bg-white relative rounded-[6px] shrink-0 w-full" data-name="Background">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[4px] items-start px-[8px] py-[6px] relative w-full">
          <Container49 />
          <Container50 />
          <Margin1 />
          <Margin2 />
          <Margin3 />
        </div>
      </div>
    </div>
  );
}

function Margin4() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-0 pt-[4px] px-0 relative shrink-0 w-full" data-name="Margin">
      <Background12 />
    </div>
  );
}

function Background13() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Background">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-start pb-[8px] pt-[12px] px-[12px] relative w-full">
          <Margin />
          <Margin4 />
        </div>
      </div>
    </div>
  );
}

function Container54() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[17px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[14px] w-[113.64px]">
        <p className="leading-[normal]">Identidade visual</p>
      </div>
    </div>
  );
}

function Container55() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 w-[313.58px]">
        <p className="leading-[normal]">Configura cores institucionais e exibição do cabeçalho.</p>
      </div>
    </div>
  );
}

function Container56() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container54 />
      <Container55 />
    </div>
  );
}

function Margin5() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[4px] pt-0 px-0 relative shrink-0 w-full" data-name="Margin">
      <Container56 />
    </div>
  );
}

function Container57() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[122.42px]">
        <p className="leading-[normal]">Cores institucionais</p>
      </div>
    </div>
  );
}

function Container58() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 w-[370.13px]">
        <p className="leading-[normal]">Definidas conforme identidade visual da Prefeitura de Jardim/CE.</p>
      </div>
    </div>
  );
}

function Background14() {
  return (
    <div className="bg-[#e9f7ee] box-border content-stretch flex flex-col items-start px-[8px] py-[4px] relative rounded-[999px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[114.89px]">
        <p className="leading-[normal]">Padrão CGM Jardim</p>
      </div>
    </div>
  );
}

function Background15() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col items-start px-[8px] py-[4px] relative rounded-[999px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 w-[80.48px]">
        <p className="leading-[normal]">Alto contraste</p>
      </div>
    </div>
  );
}

function Container59() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Container">
      <Background14 />
      <Background15 />
    </div>
  );
}

function Margin6() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-0 pt-[4px] px-0 relative shrink-0 w-full" data-name="Margin">
      <Container59 />
    </div>
  );
}

function Container60() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-gray-500 w-[445.36px]">
        <p className="leading-[normal]">Pré-visualização simplificada da barra superior e menu alinhados ao site institucional.</p>
      </div>
    </div>
  );
}

function Margin7() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-0 pt-[4px] px-0 relative shrink-0 w-full" data-name="Margin">
      <Container60 />
    </div>
  );
}

function Background16() {
  return (
    <div className="bg-white relative rounded-[6px] shrink-0 w-full" data-name="Background">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[4px] items-start px-[8px] py-[6px] relative w-full">
          <Container57 />
          <Container58 />
          <Margin6 />
          <Margin7 />
        </div>
      </div>
    </div>
  );
}

function Container61() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[140px]">
        <p className="leading-[normal]">Exibição do cabeçalho</p>
      </div>
    </div>
  );
}

function Container62() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 w-[283.81px]">
        <p className="leading-[normal]">Controle o título exibido no topo de todas as telas.</p>
      </div>
    </div>
  );
}

function Container63() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[176.89px]">
        <p className="leading-[normal]">Mostrar subtítulo do sistema</p>
      </div>
    </div>
  );
}

function Container64() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 w-[438.2px]">
        <p className="leading-[normal]">“Sistema de Gestão de Contratos Internos” abaixo do nome ContratosJardim.</p>
      </div>
    </div>
  );
}

function Container65() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[2px] items-start relative">
        <Container63 />
        <Container64 />
      </div>
    </div>
  );
}

function Background17() {
  return (
    <div className="bg-[#0b6b3a] h-[20px] relative rounded-[999px] shrink-0 w-[36px]" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[20px] items-center justify-end p-[2px] relative w-[36px]">
        <div className="bg-white rounded-[999px] shrink-0 size-[16px]" data-name="Background" />
      </div>
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div className="bg-white relative rounded-[6px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center justify-between px-[9px] py-[7px] relative w-full">
          <Container65 />
          <Background17 />
        </div>
      </div>
    </div>
  );
}

function Margin8() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-0 pt-[4px] px-0 relative shrink-0 w-full" data-name="Margin">
      <BackgroundBorder />
    </div>
  );
}

function Container66() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[214.83px]">
        <p className="leading-[normal]">Exibir brasão/logotipo institucional</p>
      </div>
    </div>
  );
}

function Container67() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 w-[329.86px]">
        <p className="leading-[normal]">Utilizar marca oficial na barra superior, quando disponível.</p>
      </div>
    </div>
  );
}

function Container68() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[2px] items-start relative">
        <Container66 />
        <Container67 />
      </div>
    </div>
  );
}

function Background18() {
  return (
    <div className="bg-[#0b6b3a] h-[20px] relative rounded-[999px] shrink-0 w-[36px]" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[20px] items-center justify-end p-[2px] relative w-[36px]">
        <div className="bg-white rounded-[999px] shrink-0 size-[16px]" data-name="Background" />
      </div>
    </div>
  );
}

function BackgroundBorder1() {
  return (
    <div className="bg-white relative rounded-[6px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center justify-between px-[9px] py-[7px] relative w-full">
          <Container68 />
          <Background18 />
        </div>
      </div>
    </div>
  );
}

function Margin9() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-0 pt-[4px] px-0 relative shrink-0 w-full" data-name="Margin">
      <BackgroundBorder1 />
    </div>
  );
}

function Background19() {
  return (
    <div className="bg-white relative rounded-[6px] shrink-0 w-full" data-name="Background">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[4px] items-start px-[8px] py-[6px] relative w-full">
          <Container61 />
          <Container62 />
          <Margin8 />
          <Margin9 />
        </div>
      </div>
    </div>
  );
}

function Container69() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <Background16 />
      <Background19 />
    </div>
  );
}

function Margin10() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-0 pt-[4px] px-0 relative shrink-0 w-full" data-name="Margin">
      <Container69 />
    </div>
  );
}

function Background20() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Background">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-start pb-[8px] pt-[12px] px-[12px] relative w-full">
          <Margin5 />
          <Margin10 />
        </div>
      </div>
    </div>
  );
}

function Container70() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[17px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[14px] w-[130.63px]">
        <p className="leading-[normal]">Layout e densidade</p>
      </div>
    </div>
  );
}

function Container71() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 w-[341.95px]">
        <p className="leading-[normal]">Adequação do espaçamento e informações visíveis por tela.</p>
      </div>
    </div>
  );
}

function Container72() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container70 />
      <Container71 />
    </div>
  );
}

function Margin11() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[4px] pt-0 px-0 relative shrink-0 w-full" data-name="Margin">
      <Container72 />
    </div>
  );
}

function Container73() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[159.34px]">
        <p className="leading-[normal]">Densidade de informação</p>
      </div>
    </div>
  );
}

function Container74() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 w-[302.17px]">
        <p className="leading-[normal]">Altere a quantidade de informações exibidas por tela.</p>
      </div>
    </div>
  );
}

function Background21() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col items-start px-[8px] py-[4px] relative rounded-[999px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 w-[67.11px]">
        <p className="leading-[normal]">Confortável</p>
      </div>
    </div>
  );
}

function Background22() {
  return (
    <div className="bg-[#e9f7ee] box-border content-stretch flex flex-col items-start px-[8px] py-[4px] relative rounded-[999px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[40.53px]">
        <p className="leading-[normal]">Padrão</p>
      </div>
    </div>
  );
}

function Background23() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col items-start px-[8px] py-[4px] relative rounded-[999px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 w-[59.2px]">
        <p className="leading-[normal]">Compacto</p>
      </div>
    </div>
  );
}

function Container75() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Container">
      <Background21 />
      <Background22 />
      <Background23 />
    </div>
  );
}

function Margin12() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-0 pt-[4px] px-0 relative shrink-0 w-full" data-name="Margin">
      <Container75 />
    </div>
  );
}

function Container76() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-gray-500 w-[357.16px]">
        <p className="leading-[normal]">Ajuste afeta principalmente tabelas de contratos, alertas e relatórios.</p>
      </div>
    </div>
  );
}

function Margin13() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-0 pt-[4px] px-0 relative shrink-0 w-full" data-name="Margin">
      <Container76 />
    </div>
  );
}

function Background24() {
  return (
    <div className="bg-white relative rounded-[6px] shrink-0 w-full" data-name="Background">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[4px] items-start px-[8px] py-[6px] relative w-full">
          <Container73 />
          <Container74 />
          <Margin12 />
          <Margin13 />
        </div>
      </div>
    </div>
  );
}

function Container77() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[155.67px]">
        <p className="leading-[normal]">Elementos de navegação</p>
      </div>
    </div>
  );
}

function Container78() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 w-[288.23px]">
        <p className="leading-[normal]">Escolha quais componentes ficam sempre visíveis.</p>
      </div>
    </div>
  );
}

function Container79() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[148.59px]">
        <p className="leading-[normal]">Manter barra lateral fixa</p>
      </div>
    </div>
  );
}

function Container80() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 w-[345.11px]">
        <p className="leading-[normal]">Recomendado para uso em computadores de mesa na CGM.</p>
      </div>
    </div>
  );
}

function Container81() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[2px] items-start relative">
        <Container79 />
        <Container80 />
      </div>
    </div>
  );
}

function Background25() {
  return (
    <div className="bg-[#0b6b3a] h-[20px] relative rounded-[999px] shrink-0 w-[36px]" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[20px] items-center justify-end p-[2px] relative w-[36px]">
        <div className="bg-white rounded-[999px] shrink-0 size-[16px]" data-name="Background" />
      </div>
    </div>
  );
}

function BackgroundBorder2() {
  return (
    <div className="bg-white relative rounded-[6px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center justify-between px-[9px] py-[7px] relative w-full">
          <Container81 />
          <Background25 />
        </div>
      </div>
    </div>
  );
}

function Margin14() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-0 pt-[4px] px-0 relative shrink-0 w-full" data-name="Margin">
      <BackgroundBorder2 />
    </div>
  );
}

function Container82() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[160.5px]">
        <p className="leading-[normal]">Exibir rodapé institucional</p>
      </div>
    </div>
  );
}

function Container83() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 w-[279.77px]">
        <p className="leading-[normal]">Mostra créditos e links rápidos em todas as telas.</p>
      </div>
    </div>
  );
}

function Container84() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[2px] items-start relative">
        <Container82 />
        <Container83 />
      </div>
    </div>
  );
}

function Background26() {
  return (
    <div className="bg-[#0b6b3a] h-[20px] relative rounded-[999px] shrink-0 w-[36px]" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[20px] items-center justify-end p-[2px] relative w-[36px]">
        <div className="bg-white rounded-[999px] shrink-0 size-[16px]" data-name="Background" />
      </div>
    </div>
  );
}

function BackgroundBorder3() {
  return (
    <div className="bg-white relative rounded-[6px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center justify-between px-[9px] py-[7px] relative w-full">
          <Container84 />
          <Background26 />
        </div>
      </div>
    </div>
  );
}

function Margin15() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-0 pt-[4px] px-0 relative shrink-0 w-full" data-name="Margin">
      <BackgroundBorder3 />
    </div>
  );
}

function Container85() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[236.72px]">
        <p className="leading-[normal]">Mostrar contagem de alertas no menu</p>
      </div>
    </div>
  );
}

function Container86() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 w-[489.17px]">
        <p className="leading-[normal]">Número de contratos com prazo próximo ao vencimento ao lado de “Alertas e prazos”.</p>
      </div>
    </div>
  );
}

function Container87() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[2px] items-start relative">
        <Container85 />
        <Container86 />
      </div>
    </div>
  );
}

function Background27() {
  return (
    <div className="bg-[#0b6b3a] h-[20px] relative rounded-[999px] shrink-0 w-[36px]" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[20px] items-center justify-end p-[2px] relative w-[36px]">
        <div className="bg-white rounded-[999px] shrink-0 size-[16px]" data-name="Background" />
      </div>
    </div>
  );
}

function BackgroundBorder4() {
  return (
    <div className="bg-white relative rounded-[6px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center justify-between px-[9px] py-[7px] relative w-full">
          <Container87 />
          <Background27 />
        </div>
      </div>
    </div>
  );
}

function Margin16() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-0 pt-[4px] px-0 relative shrink-0 w-full" data-name="Margin">
      <BackgroundBorder4 />
    </div>
  );
}

function Background28() {
  return (
    <div className="bg-white relative rounded-[6px] shrink-0 w-full" data-name="Background">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[4px] items-start px-[8px] py-[6px] relative w-full">
          <Container77 />
          <Container78 />
          <Margin14 />
          <Margin15 />
          <Margin16 />
        </div>
      </div>
    </div>
  );
}

function Container88() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[98.7px]">
        <p className="leading-[normal]">Padrão de fonte</p>
      </div>
    </div>
  );
}

function Container89() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 w-[356.27px]">
        <p className="leading-[normal]">Sugestão de legibilidade seguindo diretrizes de acessibilidade.</p>
      </div>
    </div>
  );
}

function Background29() {
  return (
    <div className="bg-[#e9f7ee] box-border content-stretch flex flex-col items-start px-[8px] py-[4px] relative rounded-[999px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[118.61px]">
        <p className="leading-[normal]">Fonte do portal CGM</p>
      </div>
    </div>
  );
}

function Background30() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col items-start px-[8px] py-[4px] relative rounded-[999px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 w-[206.69px]">
        <p className="leading-[normal]">Fonte alternativa de alta legibilidade</p>
      </div>
    </div>
  );
}

function Container90() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Container">
      <Background29 />
      <Background30 />
    </div>
  );
}

function Margin17() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-0 pt-[4px] px-0 relative shrink-0 w-full" data-name="Margin">
      <Container90 />
    </div>
  );
}

function Container91() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-gray-500 w-[467.19px]">
        <p className="leading-[normal]">A tipografia é aplicada globalmente e respeita as configurações do navegador do usuário.</p>
      </div>
    </div>
  );
}

function Margin18() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-0 pt-[4px] px-0 relative shrink-0 w-full" data-name="Margin">
      <Container91 />
    </div>
  );
}

function Background31() {
  return (
    <div className="bg-white relative rounded-[6px] shrink-0 w-full" data-name="Background">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[4px] items-start px-[8px] py-[6px] relative w-full">
          <Container88 />
          <Container89 />
          <Margin17 />
          <Margin18 />
        </div>
      </div>
    </div>
  );
}

function Container92() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <Background24 />
      <Background28 />
      <Background31 />
    </div>
  );
}

function Margin19() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-0 pt-[4px] px-0 relative shrink-0 w-full" data-name="Margin">
      <Container92 />
    </div>
  );
}

function Margin20() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-0 pt-[4px] px-0 relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-gray-500 w-[456.27px]">
        <p className="leading-[normal]">Ajustes de aparência não alteram dados dos contratos, apenas a forma de visualização.</p>
      </div>
    </div>
  );
}

function Border2() {
  return (
    <div className="box-border content-stretch flex items-center px-[13px] py-[7px] relative rounded-[6px] shrink-0" data-name="Border">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[129.78px]">
        <p className="leading-[normal]">Descartar alterações</p>
      </div>
    </div>
  );
}

function BackgroundBorder5() {
  return (
    <div className="bg-[#0b6b3a] box-border content-stretch flex items-center px-[13px] py-[7px] relative rounded-[6px] shrink-0" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-white w-[192.44px]">
        <p className="leading-[normal]">Salvar configurações de layout</p>
      </div>
    </div>
  );
}

function Container93() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <Border2 />
      <BackgroundBorder5 />
    </div>
  );
}

function Container94() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Margin20 />
      <Container93 />
    </div>
  );
}

function Margin21() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-0 pt-[8px] px-0 relative shrink-0 w-full" data-name="Margin">
      <Container94 />
    </div>
  );
}

function Background32() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Background">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-start pb-[8px] pt-[12px] px-[12px] relative w-full">
          <Margin11 />
          <Margin19 />
          <Margin21 />
        </div>
      </div>
    </div>
  );
}

function Main() {
  return (
    <div className="bg-[#f6f8fa] h-[1201px] relative shrink-0 w-full" data-name="Main">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] h-[1201px] items-start pb-[8px] pt-[16px] px-[24px] relative w-full">
          <Container45 />
          <Background13 />
          <Background20 />
          <Background32 />
        </div>
      </div>
    </div>
  );
}

function Container95() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#e6f7ee] text-[11px] w-[474.2px]">
        <p className="leading-[normal]">© Controladoria Geral do Municipio de Jardim - CE • Portal Interno de Gestão de Contratos</p>
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#e6f7ee] text-[11px] w-[63.83px]">
        <p className="leading-[normal]">Institucional</p>
      </div>
    </div>
  );
}

function Link1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#e6f7ee] text-[11px] w-[75.2px]">
        <p className="leading-[normal]">Transparência</p>
      </div>
    </div>
  );
}

function Link2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#e6f7ee] text-[11px] w-[119.36px]">
        <p className="leading-[normal]">Política de privacidade</p>
      </div>
    </div>
  );
}

function Link3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#e6f7ee] text-[11px] w-[76.58px]">
        <p className="leading-[normal]">Acessibilidade</p>
      </div>
    </div>
  );
}

function Container96() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Container">
      <Link />
      <Link1 />
      <Link2 />
      <Link3 />
    </div>
  );
}

function Background33() {
  return (
    <div className="bg-[#0a4e33] relative shrink-0 w-full" data-name="Background">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center justify-between px-[32px] py-[10px] relative w-full">
          <Container95 />
          <Container96 />
        </div>
      </div>
    </div>
  );
}

export default function Background34() {
  return (
    <div className="bg-[#f6f8fa] content-stretch flex flex-col items-start justify-between relative size-full" data-name="Background">
      <Background1 />
      <Background5 />
      <Main />
      <Background33 />
    </div>
  );
}