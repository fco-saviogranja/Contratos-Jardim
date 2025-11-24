function Container() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white w-[128.66px]">
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
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-white w-[32.98px]">
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
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-white w-[45.84px]">
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
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-white w-[96.89px]">
        <p className="leading-[normal]">Meus contratos</p>
      </div>
    </div>
  );
}

function Background2() {
  return (
    <div className="bg-[#0d612f] box-border content-stretch flex gap-[8px] items-center px-[10px] py-[6px] relative rounded-[6px] shrink-0" data-name="Background">
      <div className="shrink-0 size-[16px]" data-name="Rectangle" />
      <Container13 />
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[100.78px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin justify-center leading-[0] not-italic relative shrink-0 text-[#e6f7ee] text-[13px] w-[100.78px]">
        <p className="leading-[normal]">Todos contratos</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center px-[10px] py-[6px] relative rounded-[6px] shrink-0" data-name="Container">
      <div className="shrink-0 size-[16px]" data-name="Rectangle" />
      <Container14 />
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[131.09px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin justify-center leading-[0] not-italic relative shrink-0 text-[#e6f7ee] text-[13px] w-[131.09px]">
        <p className="leading-[normal]">Cadastro de contrato</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center px-[10px] py-[6px] relative rounded-[6px] shrink-0" data-name="Container">
      <div className="shrink-0 size-[16px]" data-name="Rectangle" />
      <Container16 />
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[101.11px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin justify-center leading-[0] not-italic relative shrink-0 text-[#e6f7ee] text-[13px] w-[101.11px]">
        <p className="leading-[normal]">Alertas e prazos</p>
      </div>
    </div>
  );
}

function Background3() {
  return (
    <div className="bg-[#f0f4f8] box-border content-stretch flex flex-col items-start px-[6px] py-0 relative rounded-[999px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-gray-500 w-[6.64px]">
        <p className="leading-[normal]">5</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center px-[10px] py-[6px] relative rounded-[6px] shrink-0" data-name="Container">
      <div className="shrink-0 size-[16px]" data-name="Rectangle" />
      <Container18 />
      <Background3 />
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Container">
      <Container12 />
      <Background2 />
      <Container15 />
      <Container17 />
      <Container19 />
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="Container">
      <Container10 />
      <Container20 />
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-gray-500 w-[52.42px]">
        <p className="leading-[normal]">Relatórios</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[61.95px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin justify-center leading-[0] not-italic relative shrink-0 text-[#e6f7ee] text-[13px] w-[61.95px]">
        <p className="leading-[normal]">Relatórios</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center px-[10px] py-[6px] relative rounded-[6px] shrink-0" data-name="Container">
      <div className="shrink-0 size-[16px]" data-name="Rectangle" />
      <Container23 />
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Container">
      <Container24 />
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="Container">
      <Container22 />
      <Container25 />
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-white w-[135.95px]">
        <p className="leading-[normal]">Administração do sistema</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[117.53px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin justify-center leading-[0] not-italic relative shrink-0 text-[#e6f7ee] text-[13px] w-[117.53px]">
        <p className="leading-[normal]">Gerenciar usuários</p>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center px-[10px] py-[6px] relative rounded-[6px] shrink-0" data-name="Container">
      <div className="shrink-0 size-[16px]" data-name="Rectangle" />
      <Container28 />
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[122px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin justify-center leading-[0] not-italic relative shrink-0 text-[#e6f7ee] text-[13px] w-[122px]">
        <p className="leading-[normal]">Parâmetros e perfis</p>
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center px-[10px] py-[6px] relative rounded-[6px] shrink-0" data-name="Container">
      <div className="shrink-0 size-[16px]" data-name="Rectangle" />
      <Container30 />
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[115.52px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin justify-center leading-[0] not-italic relative shrink-0 text-[#e6f7ee] text-[13px] w-[115.52px]">
        <p className="leading-[normal]">Aparência e layout</p>
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center px-[10px] py-[6px] relative rounded-[6px] shrink-0" data-name="Container">
      <div className="shrink-0 size-[16px]" data-name="Rectangle" />
      <Container32 />
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
      <Container29 />
      <Container31 />
      <Container33 />
      <Container35 />
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="Container">
      <Container27 />
      <Container36 />
    </div>
  );
}

function Container38() {
  return (
    <div className="content-stretch flex gap-[24px] items-end relative shrink-0" data-name="Container">
      <Container21 />
      <Container26 />
      <Container37 />
    </div>
  );
}

function Container39() {
  return (
    <div className="content-stretch flex items-end relative shrink-0 w-[1590.78px]" data-name="Container">
      <Container38 />
    </div>
  );
}

function Background4() {
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
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[21px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[18px] w-[133.98px]">
        <p className="leading-[normal]">Meus contratos</p>
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-gray-500 w-[787.86px]">
        <p className="leading-[normal]">Visualização consolidada dos contratos sob sua responsabilidade. Ordenado por Data Final de Vigência (mais urgente primeiro).</p>
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="Container">
      <Container40 />
      <Container41 />
    </div>
  );
}

function Border() {
  return (
    <div className="box-border content-stretch flex items-center px-[13px] py-[7px] relative rounded-[6px] shrink-0" data-name="Border">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[82.02px]">
        <p className="leading-[normal]">Exportar lista</p>
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative">
        <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-white w-[88.09px]">
          <p className="leading-[normal]">Novo contrato</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div className="bg-[#0b6b3a] box-border content-stretch flex gap-[6px] items-center px-[13px] py-[7px] relative rounded-[6px] shrink-0" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="bg-white relative rounded-[999px] shrink-0 size-[16px]" data-name="Background">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[16px]" />
      </div>
      <Container43 />
    </div>
  );
}

function Container44() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <Border />
      <BackgroundBorder />
    </div>
  );
}

function Container45() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container42 />
      <Container44 />
    </div>
  );
}

function Container46() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-gray-500 w-[195.05px]">
        <p className="leading-[normal]">Buscar por número ou palavra-chave</p>
      </div>
    </div>
  );
}

function BackgroundBorder1() {
  return (
    <div className="bg-white relative rounded-[6px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col items-start px-[9px] py-[7px] relative w-full">
          <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[255.22px]">
            <p className="leading-[normal]">Digite o nº do contrato ou parte do objeto</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container47() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start min-w-[140px] relative shrink-0" data-name="Container">
      <Container46 />
      <BackgroundBorder1 />
    </div>
  );
}

function Container48() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-gray-500 w-[53.83px]">
        <p className="leading-[normal]">Secretaria</p>
      </div>
    </div>
  );
}

function BackgroundBorder2() {
  return (
    <div className="bg-white relative rounded-[6px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col items-start px-[9px] py-[7px] relative w-full">
          <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[37.3px]">
            <p className="leading-[normal]">Todas</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container49() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start min-w-[140px] relative shrink-0" data-name="Container">
      <Container48 />
      <BackgroundBorder2 />
    </div>
  );
}

function Container50() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-gray-500 w-[59.02px]">
        <p className="leading-[normal]">Contratado</p>
      </div>
    </div>
  );
}

function BackgroundBorder3() {
  return (
    <div className="bg-white relative rounded-[6px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col items-start px-[9px] py-[7px] relative w-full">
          <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[37.8px]">
            <p className="leading-[normal]">Todos</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container51() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start min-w-[140px] relative shrink-0" data-name="Container">
      <Container50 />
      <BackgroundBorder3 />
    </div>
  );
}

function Container52() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-gray-500 w-[168.63px]">
        <p className="leading-[normal]">Período - Data Final de Vigência</p>
      </div>
    </div>
  );
}

function BackgroundBorder4() {
  return (
    <div className="bg-white relative rounded-[6px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col items-start px-[9px] py-[7px] relative w-full">
          <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[105.63px]">
            <p className="leading-[normal]">Próximos 90 dias</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container53() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start min-w-[140px] relative shrink-0" data-name="Container">
      <Container52 />
      <BackgroundBorder4 />
    </div>
  );
}

function Border1() {
  return (
    <div className="box-border content-stretch flex items-center px-[13px] py-[7px] relative rounded-[6px] shrink-0" data-name="Border">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[42.75px]">
        <p className="leading-[normal]">Limpar</p>
      </div>
    </div>
  );
}

function BackgroundBorder5() {
  return (
    <div className="bg-[#0b6b3a] box-border content-stretch flex items-center px-[13px] py-[7px] relative rounded-[6px] shrink-0" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-white w-[83.08px]">
        <p className="leading-[normal]">Aplicar filtros</p>
      </div>
    </div>
  );
}

function Container54() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <Border1 />
      <BackgroundBorder5 />
    </div>
  );
}

function Margin() {
  return (
    <div className="box-border content-stretch flex flex-col items-end min-w-[185.83px] pl-[412.328px] pr-0 py-0 relative shrink-0 w-[598.158px]" data-name="Margin">
      <Container54 />
    </div>
  );
}

function Background5() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Background">
      <div className="flex flex-row items-end size-full">
        <div className="box-border content-stretch flex gap-[12px] items-end px-[12px] py-[10px] relative w-full">
          <Container47 />
          <Container49 />
          <Container51 />
          <Container53 />
          <Margin />
        </div>
      </div>
    </div>
  );
}

function Container55() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[17px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[14px] w-[119.77px]">
        <p className="leading-[normal]">Lista de contratos</p>
      </div>
    </div>
  );
}

function Container56() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 w-[208.47px]">
        <p className="leading-[normal]">Ordenado por Data Final de Vigência</p>
      </div>
    </div>
  );
}

function Container57() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 w-[6.75px]">
        <p className="leading-[normal]">•</p>
      </div>
    </div>
  );
}

function Container58() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-gray-500 w-[39.83px]">
        <p className="leading-[normal]">Vigente</p>
      </div>
    </div>
  );
}

function Container59() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Container">
      <div className="bg-green-600 rounded-[999px] shrink-0 size-[8px]" data-name="Background" />
      <Container58 />
    </div>
  );
}

function Container60() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-gray-500 w-[122.22px]">
        <p className="leading-[normal]">Próximo do vencimento</p>
      </div>
    </div>
  );
}

function Container61() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Container">
      <div className="bg-amber-400 rounded-[999px] shrink-0 size-[8px]" data-name="Background" />
      <Container60 />
    </div>
  );
}

function Container62() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-gray-500 w-[42.23px]">
        <p className="leading-[normal]">Vencido</p>
      </div>
    </div>
  );
}

function Container63() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Container">
      <div className="bg-red-600 rounded-[999px] shrink-0 size-[8px]" data-name="Background" />
      <Container62 />
    </div>
  );
}

function Container64() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Container">
      <Container59 />
      <Container61 />
      <Container63 />
    </div>
  );
}

function Container65() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Container">
      <Container56 />
      <Container57 />
      <Container64 />
    </div>
  );
}

function Container66() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container55 />
      <Container65 />
    </div>
  );
}

function Margin1() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[4px] pt-0 px-0 relative shrink-0 w-full" data-name="Margin">
      <Container66 />
    </div>
  );
}

function Cell() {
  return (
    <div className="box-border content-stretch flex flex-col items-start px-[10px] py-[8px] relative shrink-0 w-[225.67px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[104.67px]">
        <p className="leading-[normal]">Secretaria / Órgão</p>
      </div>
    </div>
  );
}

function Cell1() {
  return (
    <div className="box-border content-stretch flex flex-col items-start px-[10px] py-[8px] relative shrink-0 w-[271.27px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[64.38px]">
        <p className="leading-[normal]">Contratado</p>
      </div>
    </div>
  );
}

function Cell2() {
  return (
    <div className="box-border content-stretch flex flex-col items-start px-[10px] py-[8px] relative shrink-0 w-[459.17px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[37.91px]">
        <p className="leading-[normal]">Objeto</p>
      </div>
    </div>
  );
}

function Cell3() {
  return (
    <div className="box-border content-stretch flex flex-col items-start px-[10px] py-[8px] relative shrink-0 w-[153.64px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[127.66px]">
        <p className="leading-[normal]">Data Final de Vigência</p>
      </div>
    </div>
  );
}

function Cell4() {
  return (
    <div className="box-border content-stretch flex flex-col items-start px-[10px] py-[8px] relative shrink-0 w-[131.31px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[50px]">
        <p className="leading-[normal]">Situação</p>
      </div>
    </div>
  );
}

function Cell5() {
  return (
    <div className="box-border content-stretch flex flex-col items-start px-[10px] py-[8px] relative shrink-0 w-[126.94px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[36.11px]">
        <p className="leading-[normal]">Ações</p>
      </div>
    </div>
  );
}

function Row() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Row">
      <Cell />
      <Cell1 />
      <Cell2 />
      <Cell3 />
      <Cell4 />
      <Cell5 />
    </div>
  );
}

function Header() {
  return (
    <div className="bg-[#e9f7ee] content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Header">
      <Row />
    </div>
  );
}

function Data() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-0 pb-[24px] pt-[8px] px-[10px] right-[1142.33px] top-0" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[124.42px]">
        <p className="leading-[normal]">Secretaria de Saúde</p>
      </div>
    </div>
  );
}

function Data1() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-[225.67px] pb-[24px] pt-[8px] px-[10px] right-[871.06px] top-0" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[144.03px]">
        <p className="leading-[normal]">Clínica Vida Plena Ltda.</p>
      </div>
    </div>
  );
}

function Data2() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-[496.94px] px-[10px] py-[8px] right-[411.89px] top-0" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[32px] justify-center leading-[normal] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[426.7px]">
        <p className="mb-0">Prestação de serviços médicos especializados para atenção básica e</p>
        <p>urgência no município de Jardim.</p>
      </div>
    </div>
  );
}

function Data3() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-[956.11px] pb-[24px] pt-[8px] px-[10px] right-[258.25px] top-0" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[70.84px]">
        <p className="leading-[normal]">12/02/2026</p>
      </div>
    </div>
  );
}

function Background6() {
  return (
    <div className="bg-green-600 box-border content-stretch flex items-center justify-center min-w-[80px] px-[19.72px] py-[2px] relative rounded-[999px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-center text-white w-[40.56px]">
        <p className="leading-[normal]">Vigente</p>
      </div>
    </div>
  );
}

function Data4() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-[1109.75px] pb-[22px] pt-[8px] px-[10px] right-[126.94px] top-0" data-name="Data">
      <Background6 />
    </div>
  );
}

function Container67() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pl-0 pr-[18.47px] py-0 relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[30px] justify-center leading-[normal] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[49.19px]">
        <p className="mb-0">Ver</p>
        <p>detalhes</p>
      </div>
    </div>
  );
}

function Container68() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[33.28px]">
        <p className="leading-[normal]">Editar</p>
      </div>
    </div>
  );
}

function Data5() {
  return (
    <div className="absolute content-stretch flex gap-[6px] items-center left-[1251.06px] right-[10px] top-[8px]" data-name="Data">
      <Container67 />
      <Container68 />
    </div>
  );
}

function Row1() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full" data-name="Row">
      <Data />
      <Data1 />
      <Data2 />
      <Data3 />
      <Data4 />
      <Data5 />
    </div>
  );
}

function Data6() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-0 pb-[24px] pt-[8px] px-[10px] right-[1142.33px] top-0" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[146.52px]">
        <p className="leading-[normal]">Secretaria de Educação</p>
      </div>
    </div>
  );
}

function Data7() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-[225.67px] pb-[24px] pt-[8px] px-[10px] right-[871.06px] top-0" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[197.08px]">
        <p className="leading-[normal]">Alfa Sistemas Educacionais S.A.</p>
      </div>
    </div>
  );
}

function Data8() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-[496.94px] px-[10px] py-[8px] right-[411.89px] top-0" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[32px] justify-center leading-[normal] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[377.62px]">
        <p className="mb-0">Fornecimento de material didático e tecnológico para escolas</p>
        <p>municipais, incluindo suporte e atualização.</p>
      </div>
    </div>
  );
}

function Data9() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-[956.11px] pb-[24px] pt-[8px] px-[10px] right-[258.25px] top-0" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[73.64px]">
        <p className="leading-[normal]">30/09/2025</p>
      </div>
    </div>
  );
}

function Background7() {
  return (
    <div className="bg-amber-400 box-border content-stretch flex items-center justify-center min-w-[80px] px-[6px] py-[2px] relative rounded-[999px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-black text-center w-[91.23px]">
        <p className="leading-[normal]">Próx. vencimento</p>
      </div>
    </div>
  );
}

function Data10() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-[1109.75px] pb-[22px] pt-[8px] px-[10px] right-[126.94px] top-0" data-name="Data">
      <Background7 />
    </div>
  );
}

function Container69() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[30px] justify-center leading-[normal] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[49.19px]">
        <p className="mb-0">Ver</p>
        <p>detalhes</p>
      </div>
    </div>
  );
}

function Container70() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[30px] justify-center leading-[normal] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[51.72px]">
        <p className="mb-0">Registrar</p>
        <p>ação</p>
      </div>
    </div>
  );
}

function Data11() {
  return (
    <div className="absolute content-stretch flex gap-[6px] items-center left-[1251.06px] right-[10px] top-[8px]" data-name="Data">
      <Container69 />
      <Container70 />
    </div>
  );
}

function Row2() {
  return (
    <div className="bg-[#f0f4f8] h-[48px] relative shrink-0 w-full" data-name="Row">
      <Data6 />
      <Data7 />
      <Data8 />
      <Data9 />
      <Data10 />
      <Data11 />
    </div>
  );
}

function Data12() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-0 pb-[24px] pt-[8px] px-[10px] right-[1142.33px] top-0" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[122.5px]">
        <p className="leading-[normal]">Secretaria de Obras</p>
      </div>
    </div>
  );
}

function Data13() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-[225.67px] pb-[24px] pt-[8px] px-[10px] right-[871.06px] top-0" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[190.84px]">
        <p className="leading-[normal]">Construtora Jardim Urbano ME</p>
      </div>
    </div>
  );
}

function Data14() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-[496.94px] px-[10px] py-[8px] right-[411.89px] top-0" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[32px] justify-center leading-[normal] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[418.59px]">
        <p className="mb-0">Execução de serviços de manutenção preventiva e corretiva de vias</p>
        <p>urbanas e rurais.</p>
      </div>
    </div>
  );
}

function Data15() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-[956.11px] pb-[24px] pt-[8px] px-[10px] right-[258.25px] top-0" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[70.39px]">
        <p className="leading-[normal]">15/08/2025</p>
      </div>
    </div>
  );
}

function Background8() {
  return (
    <div className="bg-amber-400 box-border content-stretch flex items-center justify-center min-w-[80px] px-[6px] py-[2px] relative rounded-[999px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-black text-center w-[91.23px]">
        <p className="leading-[normal]">Próx. vencimento</p>
      </div>
    </div>
  );
}

function Data16() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-[1109.75px] pb-[22px] pt-[8px] px-[10px] right-[126.94px] top-0" data-name="Data">
      <Background8 />
    </div>
  );
}

function Container71() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[30px] justify-center leading-[normal] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[49.19px]">
        <p className="mb-0">Ver</p>
        <p>detalhes</p>
      </div>
    </div>
  );
}

function Container72() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[30px] justify-center leading-[normal] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[51.72px]">
        <p className="mb-0">Registrar</p>
        <p>ação</p>
      </div>
    </div>
  );
}

function Data17() {
  return (
    <div className="absolute content-stretch flex gap-[6px] items-center left-[1251.06px] right-[10px] top-[8px]" data-name="Data">
      <Container71 />
      <Container72 />
    </div>
  );
}

function Row3() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full" data-name="Row">
      <Data12 />
      <Data13 />
      <Data14 />
      <Data15 />
      <Data16 />
      <Data17 />
    </div>
  );
}

function Data18() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-0 pb-[24px] pt-[8px] px-[10px] right-[1142.33px] top-0" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[173.8px]">
        <p className="leading-[normal]">Secretaria de Administração</p>
      </div>
    </div>
  );
}

function Data19() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-[225.67px] pb-[24px] pt-[8px] px-[10px] right-[871.06px] top-0" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[169.27px]">
        <p className="leading-[normal]">Alpha Serviços Gerais Ltda.</p>
      </div>
    </div>
  );
}

function Data20() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-[496.94px] px-[10px] py-[8px] right-[411.89px] top-0" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[32px] justify-center leading-[normal] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[407.78px]">
        <p className="mb-0">Serviços de limpeza, conservação e copeiragem para as unidades</p>
        <p>administrativas da Prefeitura de Jardim.</p>
      </div>
    </div>
  );
}

function Data21() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-[956.11px] pb-[24px] pt-[8px] px-[10px] right-[258.25px] top-0" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[70.55px]">
        <p className="leading-[normal]">10/05/2025</p>
      </div>
    </div>
  );
}

function Background9() {
  return (
    <div className="bg-red-600 box-border content-stretch flex items-center justify-center min-w-[80px] pl-[18.56px] pr-[18.58px] py-[2px] relative rounded-[999px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-center text-white w-[42.86px]">
        <p className="leading-[normal]">Vencido</p>
      </div>
    </div>
  );
}

function Data22() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-[1109.75px] pb-[22px] pt-[8px] px-[10px] right-[126.94px] top-0" data-name="Data">
      <Background9 />
    </div>
  );
}

function Container73() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pl-0 pr-[9.09px] py-0 relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[30px] justify-center leading-[normal] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[49.19px]">
        <p className="mb-0">Ver</p>
        <p>detalhes</p>
      </div>
    </div>
  );
}

function Container74() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[42.66px]">
        <p className="leading-[normal]">Anexos</p>
      </div>
    </div>
  );
}

function Data23() {
  return (
    <div className="absolute content-stretch flex gap-[6px] items-center left-[1251.06px] right-[10px] top-[8px]" data-name="Data">
      <Container73 />
      <Container74 />
    </div>
  );
}

function Row4() {
  return (
    <div className="bg-[#f0f4f8] h-[48px] relative shrink-0 w-full" data-name="Row">
      <Data18 />
      <Data19 />
      <Data20 />
      <Data21 />
      <Data22 />
      <Data23 />
    </div>
  );
}

function Body() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Body">
      <Row1 />
      <Row2 />
      <Row3 />
      <Row4 />
    </div>
  );
}

function Table() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Table">
      <Header />
      <Body />
    </div>
  );
}

function Background10() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start overflow-clip relative rounded-[8px] shrink-0 w-full" data-name="Background">
      <Table />
    </div>
  );
}

function Container75() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-gray-500 w-[166px]">
        <p className="leading-[normal]">Mostrando 1–4 de 120 contratos</p>
      </div>
    </div>
  );
}

function Container76() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-gray-500 w-[351.42px]">
        <p className="leading-[normal]">Ordenação padrão: Data Final de Vigência (mais próximos primeiro)</p>
      </div>
    </div>
  );
}

function Container77() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container75 />
      <Container76 />
    </div>
  );
}

function Margin2() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-0 pt-[4px] px-0 relative shrink-0 w-full" data-name="Margin">
      <Container77 />
    </div>
  );
}

function Background11() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Background">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-start pb-[8px] pt-[12px] px-[12px] relative w-full">
          <Margin1 />
          <Background10 />
          <Margin2 />
        </div>
      </div>
    </div>
  );
}

function Main() {
  return (
    <div className="bg-[#f6f8fa] h-[600px] relative shrink-0 w-full" data-name="Main">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] h-[600px] items-start pb-[8px] pt-[16px] px-[24px] relative w-full">
          <Container45 />
          <Background5 />
          <Background11 />
        </div>
      </div>
    </div>
  );
}

function Container78() {
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

function Container79() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Container">
      <Link />
      <Link1 />
      <Link2 />
      <Link3 />
    </div>
  );
}

function Background12() {
  return (
    <div className="bg-[#0a4e33] relative shrink-0 w-full" data-name="Background">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center justify-between px-[32px] py-[10px] relative w-full">
          <Container78 />
          <Container79 />
        </div>
      </div>
    </div>
  );
}

export default function Background13() {
  return (
    <div className="bg-[#f6f8fa] content-stretch flex flex-col items-start justify-between relative size-full" data-name="Background">
      <Background1 />
      <Background4 />
      <Main />
      <Background12 />
    </div>
  );
}