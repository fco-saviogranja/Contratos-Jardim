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
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-white w-[101.11px]">
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

function Background3() {
  return (
    <div className="bg-[#0d612f] box-border content-stretch flex gap-[8px] items-center px-[10px] py-[6px] relative rounded-[6px] shrink-0" data-name="Background">
      <div className="shrink-0 size-[16px]" data-name="Rectangle" />
      <Container19 />
      <Background2 />
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Container">
      <Container12 />
      <Container14 />
      <Container16 />
      <Container18 />
      <Background3 />
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
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[21px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[18px] w-[139.31px]">
        <p className="leading-[normal]">Alertas e prazos</p>
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-gray-500 w-[863.63px]">
        <p className="leading-[normal]">Visão consolidada de contratos com vencimentos próximos, pendências documentais, sem fiscal e com valores empenhados ultrapassados.</p>
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
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[168.5px]">
        <p className="leading-[normal]">Configurar limites de alerta</p>
      </div>
    </div>
  );
}

function Border1() {
  return (
    <div className="box-border content-stretch flex items-center px-[13px] py-[7px] relative rounded-[6px] shrink-0" data-name="Border">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[153.61px]">
        <p className="leading-[normal]">Editar nomes dos alertas</p>
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <Border />
      <Border1 />
    </div>
  );
}

function Container44() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container42 />
      <Container43 />
    </div>
  );
}

function Container45() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-gray-500 w-[72.5px]">
        <p className="leading-[normal]">Tipo de alerta</p>
      </div>
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div className="bg-white relative rounded-[6px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col items-start px-[9px] py-[7px] relative w-full">
          <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[89.78px]">
            <p className="leading-[normal]">Todos os tipos</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start min-w-[150px] relative shrink-0" data-name="Container">
      <Container45 />
      <BackgroundBorder />
    </div>
  );
}

function Container47() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-gray-500 w-[121.22px]">
        <p className="leading-[normal]">Período de vencimento</p>
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
          <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[105.63px]">
            <p className="leading-[normal]">Próximos 60 dias</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start min-w-[150px] relative shrink-0" data-name="Container">
      <Container47 />
      <BackgroundBorder1 />
    </div>
  );
}

function Container49() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-gray-500 w-[95.94px]">
        <p className="leading-[normal]">Secretaria / Órgão</p>
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

function Container50() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start min-w-[150px] relative shrink-0" data-name="Container">
      <Container49 />
      <BackgroundBorder2 />
    </div>
  );
}

function Container51() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-gray-500 w-[101.92px]">
        <p className="leading-[normal]">Gestor responsável</p>
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

function Container52() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start min-w-[150px] relative shrink-0" data-name="Container">
      <Container51 />
      <BackgroundBorder3 />
    </div>
  );
}

function Border2() {
  return (
    <div className="box-border content-stretch flex items-center px-[13px] py-[7px] relative rounded-[6px] shrink-0" data-name="Border">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[42.75px]">
        <p className="leading-[normal]">Limpar</p>
      </div>
    </div>
  );
}

function BackgroundBorder4() {
  return (
    <div className="bg-[#0b6b3a] box-border content-stretch flex items-center px-[13px] py-[7px] relative rounded-[6px] shrink-0" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-white w-[83.08px]">
        <p className="leading-[normal]">Aplicar filtros</p>
      </div>
    </div>
  );
}

function Container53() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <Border2 />
      <BackgroundBorder4 />
    </div>
  );
}

function Margin() {
  return (
    <div className="box-border content-stretch flex flex-col items-end min-w-[185.83px] pl-[534.172px] pr-0 py-0 relative shrink-0 w-[720.002px]" data-name="Margin">
      <Container53 />
    </div>
  );
}

function Background5() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Background">
      <div className="flex flex-row items-end size-full">
        <div className="box-border content-stretch flex gap-[12px] items-end px-[12px] py-[10px] relative w-full">
          <Container46 />
          <Container48 />
          <Container50 />
          <Container52 />
          <Margin />
        </div>
      </div>
    </div>
  );
}

function Container54() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[17px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[14px] w-[212.55px]">
        <p className="leading-[normal]">Alertas de vencimento de prazo</p>
      </div>
    </div>
  );
}

function Container55() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 w-[250.91px]">
        <p className="leading-[normal]">3 contratos com vencimento em até 60 dias</p>
      </div>
    </div>
  );
}

function Container56() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 w-[6.75px]">
        <p className="leading-[normal]">•</p>
      </div>
    </div>
  );
}

function Container57() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-gray-500 w-[90.06px]">
        <p className="leading-[normal]">Próx. vencimento</p>
      </div>
    </div>
  );
}

function Container58() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Container">
      <div className="bg-amber-400 rounded-[999px] shrink-0 size-[8px]" data-name="Background" />
      <Container57 />
    </div>
  );
}

function Container59() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-gray-500 w-[42.23px]">
        <p className="leading-[normal]">Vencido</p>
      </div>
    </div>
  );
}

function Container60() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Container">
      <div className="bg-red-600 rounded-[999px] shrink-0 size-[8px]" data-name="Background" />
      <Container59 />
    </div>
  );
}

function Container61() {
  return (
    <div className="content-stretch flex gap-[12.01px] items-center relative shrink-0" data-name="Container">
      <Container58 />
      <Container60 />
    </div>
  );
}

function Container62() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <Container55 />
      <Container56 />
      <Container61 />
    </div>
  );
}

function Container63() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container54 />
      <Container62 />
    </div>
  );
}

function Margin1() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[4px] pt-0 px-0 relative shrink-0 w-full" data-name="Margin">
      <Container63 />
    </div>
  );
}

function Cell() {
  return (
    <div className="box-border content-stretch flex flex-col items-start px-[10px] py-[8px] relative shrink-0 w-[161.94px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[45.67px]">
        <p className="leading-[normal]">Número</p>
      </div>
    </div>
  );
}

function Cell1() {
  return (
    <div className="box-border content-stretch flex flex-col items-start px-[10px] py-[8px] relative shrink-0 w-[402.53px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[37.91px]">
        <p className="leading-[normal]">Objeto</p>
      </div>
    </div>
  );
}

function Cell2() {
  return (
    <div className="box-border content-stretch flex flex-col items-start px-[10px] py-[8px] relative shrink-0 w-[215.91px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[58.72px]">
        <p className="leading-[normal]">Secretaria</p>
      </div>
    </div>
  );
}

function Cell3() {
  return (
    <div className="box-border content-stretch flex flex-col items-start px-[10px] py-[8px] relative shrink-0 w-[162.27px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[68.22px]">
        <p className="leading-[normal]">Vencimento</p>
      </div>
    </div>
  );
}

function Cell4() {
  return (
    <div className="box-border content-stretch flex flex-col items-start px-[10px] py-[8px] relative shrink-0 w-[135.81px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[50px]">
        <p className="leading-[normal]">Situação</p>
      </div>
    </div>
  );
}

function Cell5() {
  return (
    <div className="box-border content-stretch flex flex-col items-start px-[10px] py-[8px] relative shrink-0 w-[134.83px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[38.34px]">
        <p className="leading-[normal]">Gestor</p>
      </div>
    </div>
  );
}

function Cell6() {
  return (
    <div className="box-border content-stretch flex flex-col items-start px-[10px] py-[8px] relative shrink-0 w-[154.72px]" data-name="Cell">
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
      <Cell6 />
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
    <div className="absolute box-border content-stretch flex flex-col items-start left-0 pb-[24px] pt-[8px] px-[10px] right-[1206.06px] top-0" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[61.25px]">
        <p className="leading-[normal]">045/2024</p>
      </div>
    </div>
  );
}

function Data1() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-[161.94px] px-[10px] py-[8px] right-[803.53px] top-0" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[32px] justify-center leading-[normal] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[377.62px]">
        <p className="mb-0">Fornecimento de material didático e tecnológico para escolas</p>
        <p>municipais.</p>
      </div>
    </div>
  );
}

function Data2() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-[564.47px] pb-[24px] pt-[8px] px-[10px] right-[587.62px] top-0" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[146.52px]">
        <p className="leading-[normal]">Secretaria de Educação</p>
      </div>
    </div>
  );
}

function Data3() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-[780.38px] pb-[24px] pt-[8px] px-[10px] right-[425.35px] top-0" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[73.64px]">
        <p className="leading-[normal]">30/09/2025</p>
      </div>
    </div>
  );
}

function Background6() {
  return (
    <div className="bg-amber-400 box-border content-stretch flex items-center justify-center min-w-[80px] px-[6px] py-[2px] relative rounded-[999px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-black text-center w-[91.23px]">
        <p className="leading-[normal]">Próx. vencimento</p>
      </div>
    </div>
  );
}

function Data4() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-[942.64px] pb-[22px] pt-[8px] px-[10px] right-[289.55px] top-0" data-name="Data">
      <Background6 />
    </div>
  );
}

function Data5() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-[1078.45px] pb-[24px] pt-[8px] px-[10px] right-[154.72px] top-0" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[81.66px]">
        <p className="leading-[normal]">Carlos Souza</p>
      </div>
    </div>
  );
}

function Container64() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pl-0 pr-[11.24px] py-0 relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[30px] justify-center leading-[normal] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[48.1px]">
        <p className="mb-0">Ver</p>
        <p>contrato</p>
      </div>
    </div>
  );
}

function Container65() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pl-0 pr-[17.67px] py-0 relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[30px] justify-center leading-[normal] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[51.71px]">
        <p className="mb-0">Registrar</p>
        <p>ação</p>
      </div>
    </div>
  );
}

function Data6() {
  return (
    <div className="absolute content-stretch flex gap-[6.01px] items-center left-[1223.28px] right-[10px] top-[8px]" data-name="Data">
      <Container64 />
      <Container65 />
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
      <Data6 />
    </div>
  );
}

function Data7() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[22px] pt-[8px] px-[10px] relative shrink-0 w-[161.94px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[60.11px]">
        <p className="leading-[normal]">078/2024</p>
      </div>
    </div>
  );
}

function Data8() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[22px] pt-[8px] px-[10px] relative shrink-0 w-[402.53px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[368.3px]">
        <p className="leading-[normal]">Manutenção preventiva e corretiva de vias urbanas e rurais.</p>
      </div>
    </div>
  );
}

function Data9() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[22px] pt-[8px] px-[10px] relative shrink-0 w-[215.91px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[122.5px]">
        <p className="leading-[normal]">Secretaria de Obras</p>
      </div>
    </div>
  );
}

function Data10() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[22px] pt-[8px] px-[10px] relative shrink-0 w-[162.27px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[70.39px]">
        <p className="leading-[normal]">15/08/2025</p>
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

function Data11() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[20px] pt-[8px] px-[10px] relative shrink-0 w-[135.81px]" data-name="Data">
      <Background7 />
    </div>
  );
}

function Data12() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[22px] pt-[8px] px-[10px] relative shrink-0 w-[134.83px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[71.03px]">
        <p className="leading-[normal]">Ana Pereira</p>
      </div>
    </div>
  );
}

function Container66() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pl-0 pr-[6.82px] py-0 relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[30px] justify-center leading-[normal] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[48.1px]">
        <p className="mb-0">Ver</p>
        <p>contrato</p>
      </div>
    </div>
  );
}

function Container67() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pl-0 pr-[24.8px] py-0 relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[30px] justify-center leading-[normal] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[49px]">
        <p className="mb-0">Agendar</p>
        <p>reunião</p>
      </div>
    </div>
  );
}

function Data13() {
  return (
    <div className="box-border content-stretch flex gap-[6px] items-center pl-[10px] pr-0 py-0 relative shrink-0 w-[144.72px]" data-name="Data">
      <Container66 />
      <Container67 />
    </div>
  );
}

function Row2() {
  return (
    <div className="bg-[#f0f4f8] relative shrink-0 w-full" data-name="Row">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex items-center justify-center pl-0 pr-[10px] py-0 relative w-full">
          <Data7 />
          <Data8 />
          <Data9 />
          <Data10 />
          <Data11 />
          <Data12 />
          <Data13 />
        </div>
      </div>
    </div>
  );
}

function Data14() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-0 pb-[24px] pt-[8px] px-[10px] right-[1206.06px] top-0" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[58.03px]">
        <p className="leading-[normal]">123/2023</p>
      </div>
    </div>
  );
}

function Data15() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-[161.94px] px-[10px] py-[8px] right-[803.53px] top-0" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[32px] justify-center leading-[normal] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[330.12px]">
        <p className="mb-0">Serviços de limpeza, conservação e copeiragem para</p>
        <p>unidades administrativas.</p>
      </div>
    </div>
  );
}

function Data16() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-[564.47px] pb-[24px] pt-[8px] px-[10px] right-[587.62px] top-0" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[173.8px]">
        <p className="leading-[normal]">Secretaria de Administração</p>
      </div>
    </div>
  );
}

function Data17() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-[780.38px] pb-[24px] pt-[8px] px-[10px] right-[425.35px] top-0" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[70.55px]">
        <p className="leading-[normal]">10/05/2025</p>
      </div>
    </div>
  );
}

function Background8() {
  return (
    <div className="bg-red-600 box-border content-stretch flex items-center justify-center min-w-[80px] pl-[18.56px] pr-[18.58px] py-[2px] relative rounded-[999px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-center text-white w-[42.86px]">
        <p className="leading-[normal]">Vencido</p>
      </div>
    </div>
  );
}

function Data18() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-[942.64px] pb-[22px] pt-[8px] px-[10px] right-[289.55px] top-0" data-name="Data">
      <Background8 />
    </div>
  );
}

function Data19() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-[1078.45px] pb-[24px] pt-[8px] px-[10px] right-[154.72px] top-0" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[63.28px]">
        <p className="leading-[normal]">João Lima</p>
      </div>
    </div>
  );
}

function Container68() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[30px] justify-center leading-[normal] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[48.1px]">
        <p className="mb-0">Ver</p>
        <p>contrato</p>
      </div>
    </div>
  );
}

function Container69() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[30px] justify-center leading-[normal] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[80.57px]">
        <p className="mb-0">Registrar</p>
        <p>encerramento</p>
      </div>
    </div>
  );
}

function Data20() {
  return (
    <div className="absolute content-stretch flex gap-[6px] items-center left-[1223.28px] right-[10px] top-[8px]" data-name="Data">
      <Container68 />
      <Container69 />
    </div>
  );
}

function Row3() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full" data-name="Row">
      <Data14 />
      <Data15 />
      <Data16 />
      <Data17 />
      <Data18 />
      <Data19 />
      <Data20 />
    </div>
  );
}

function Body() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Body">
      <Row1 />
      <Row2 />
      <Row3 />
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

function Background9() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start overflow-clip relative rounded-[8px] shrink-0 w-full" data-name="Background">
      <Table />
    </div>
  );
}

function Container70() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-gray-500 w-[254.89px]">
        <p className="leading-[normal]">Mostrando 1–3 de 3 contratos em alerta de prazo</p>
      </div>
    </div>
  );
}

function Container71() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-gray-500 w-[309.86px]">
        <p className="leading-[normal]">Ordenado por data de vencimento (mais próximos primeiro)</p>
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

function Margin2() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-0 pt-[4px] px-0 relative shrink-0 w-full" data-name="Margin">
      <Container72 />
    </div>
  );
}

function Background10() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Background">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-start pb-[8px] pt-[12px] px-[12px] relative w-full">
          <Margin1 />
          <Background9 />
          <Margin2 />
        </div>
      </div>
    </div>
  );
}

function Container73() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[17px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[14px] w-[239.97px]">
        <p className="leading-[normal]">Alertas de pendências documentais</p>
      </div>
    </div>
  );
}

function Container74() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 w-[231.84px]">
        <p className="leading-[normal]">2 contratos com documentos pendentes</p>
      </div>
    </div>
  );
}

function Container75() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 w-[6.75px]">
        <p className="leading-[normal]">•</p>
      </div>
    </div>
  );
}

function Container76() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[102.7px]">
        <p className="leading-[normal]">Ver lista completa</p>
      </div>
    </div>
  );
}

function Container77() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <Container74 />
      <Container75 />
      <Container76 />
    </div>
  );
}

function Container78() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container73 />
      <Container77 />
    </div>
  );
}

function Margin3() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[4px] pt-0 px-0 relative shrink-0 w-full" data-name="Margin">
      <Container78 />
    </div>
  );
}

function Cell7() {
  return (
    <div className="box-border content-stretch flex flex-col items-start px-[10px] py-[8px] relative shrink-0 w-[162.97px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[45.67px]">
        <p className="leading-[normal]">Número</p>
      </div>
    </div>
  );
}

function Cell8() {
  return (
    <div className="box-border content-stretch flex flex-col items-start px-[10px] py-[8px] relative shrink-0 w-[379.31px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[37.91px]">
        <p className="leading-[normal]">Objeto</p>
      </div>
    </div>
  );
}

function Cell9() {
  return (
    <div className="box-border content-stretch flex flex-col items-start px-[10px] py-[8px] relative shrink-0 w-[244.13px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[123.78px]">
        <p className="leading-[normal]">Documento pendente</p>
      </div>
    </div>
  );
}

function Cell10() {
  return (
    <div className="box-border content-stretch flex flex-col items-start px-[10px] py-[8px] relative shrink-0 w-[163.19px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[66.81px]">
        <p className="leading-[normal]">Prazo limite</p>
      </div>
    </div>
  );
}

function Cell11() {
  return (
    <div className="box-border content-stretch flex flex-col items-start px-[10px] py-[8px] relative shrink-0 w-[136.28px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[50px]">
        <p className="leading-[normal]">Situação</p>
      </div>
    </div>
  );
}

function Cell12() {
  return (
    <div className="box-border content-stretch flex flex-col items-start px-[10px] py-[8px] relative shrink-0 w-[135.98px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[38.34px]">
        <p className="leading-[normal]">Gestor</p>
      </div>
    </div>
  );
}

function Cell13() {
  return (
    <div className="box-border content-stretch flex flex-col items-start px-[10px] py-[8px] relative shrink-0 w-[146.14px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[36.11px]">
        <p className="leading-[normal]">Ações</p>
      </div>
    </div>
  );
}

function Row4() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Row">
      <Cell7 />
      <Cell8 />
      <Cell9 />
      <Cell10 />
      <Cell11 />
      <Cell12 />
      <Cell13 />
    </div>
  );
}

function Header1() {
  return (
    <div className="bg-[#e9f7ee] content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Header">
      <Row4 />
    </div>
  );
}

function Data21() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-0 pb-[24px] pt-[8px] px-[10px] right-[1205.03px] top-0" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[58.09px]">
        <p className="leading-[normal]">201/2022</p>
      </div>
    </div>
  );
}

function Data22() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-[162.97px] px-[10px] py-[8px] right-[825.72px] top-0" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[32px] justify-center leading-[normal] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[332.76px]">
        <p className="mb-0">Locação de veículos para demandas administrativas e</p>
        <p>operacionais.</p>
      </div>
    </div>
  );
}

function Data23() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-[542.28px] pb-[24px] pt-[8px] px-[10px] right-[581.59px] top-0" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[197.66px]">
        <p className="leading-[normal]">Relatório de fiscalização mensal</p>
      </div>
    </div>
  );
}

function Data24() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-[786.41px] pb-[24px] pt-[8px] px-[10px] right-[418.4px] top-0" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[73.88px]">
        <p className="leading-[normal]">20/04/2025</p>
      </div>
    </div>
  );
}

function Background11() {
  return (
    <div className="bg-amber-400 box-border content-stretch flex items-center justify-center min-w-[80px] pl-[14.97px] pr-[14.98px] py-[2px] relative rounded-[999px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-black text-center w-[50.05px]">
        <p className="leading-[normal]">Pendente</p>
      </div>
    </div>
  );
}

function Data25() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-[949.59px] pb-[22px] pt-[8px] px-[10px] right-[282.13px] top-0" data-name="Data">
      <Background11 />
    </div>
  );
}

function Data26() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-[1085.88px] pb-[24px] pt-[8px] px-[10px] right-[146.14px] top-0" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[99.72px]">
        <p className="leading-[normal]">Fernanda Souza</p>
      </div>
    </div>
  );
}

function Container79() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pl-0 pr-[18.14px] py-0 relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[30px] justify-center leading-[normal] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[39.52px]">
        <p className="mb-0">Cobrar</p>
        <p>gestor</p>
      </div>
    </div>
  );
}

function Container80() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pl-0 pr-[10.77px] py-0 relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[30px] justify-center leading-[normal] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[51.71px]">
        <p className="mb-0">Registrar</p>
        <p>envio</p>
      </div>
    </div>
  );
}

function Data27() {
  return (
    <div className="absolute content-stretch flex gap-[6px] items-center left-[1231.86px] right-[10px] top-[8px]" data-name="Data">
      <Container79 />
      <Container80 />
    </div>
  );
}

function Row5() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full" data-name="Row">
      <Data21 />
      <Data22 />
      <Data23 />
      <Data24 />
      <Data25 />
      <Data26 />
      <Data27 />
    </div>
  );
}

function Data28() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-0 pb-[24px] pt-[8px] px-[10px] right-[1205.03px] top-0" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[58.3px]">
        <p className="leading-[normal]">310/2023</p>
      </div>
    </div>
  );
}

function Data29() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-[162.97px] px-[10px] py-[8px] right-[825.72px] top-0" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[32px] justify-center leading-[normal] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[323.47px]">
        <p className="mb-0">Fornecimento de medicamentos para rede básica de</p>
        <p>saúde.</p>
      </div>
    </div>
  );
}

function Data30() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-[542.28px] pb-[24px] pt-[8px] px-[10px] right-[581.59px] top-0" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[166.41px]">
        <p className="leading-[normal]">Notas fiscais do último lote</p>
      </div>
    </div>
  );
}

function Data31() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-[786.41px] pb-[24px] pt-[8px] px-[10px] right-[418.4px] top-0" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[72.97px]">
        <p className="leading-[normal]">05/05/2025</p>
      </div>
    </div>
  );
}

function Background12() {
  return (
    <div className="bg-amber-400 box-border content-stretch flex items-center justify-center min-w-[80px] pl-[14.97px] pr-[14.98px] py-[2px] relative rounded-[999px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-black text-center w-[50.05px]">
        <p className="leading-[normal]">Pendente</p>
      </div>
    </div>
  );
}

function Data32() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-[949.59px] pb-[22px] pt-[8px] px-[10px] right-[282.13px] top-0" data-name="Data">
      <Background12 />
    </div>
  );
}

function Data33() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-[1085.88px] pb-[24px] pt-[8px] px-[10px] right-[146.14px] top-0" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[67.42px]">
        <p className="leading-[normal]">Maria Silva</p>
      </div>
    </div>
  );
}

function Container81() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[30px] justify-center leading-[normal] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[48.09px]">
        <p className="mb-0">Ver</p>
        <p>contrato</p>
      </div>
    </div>
  );
}

function Container82() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[30px] justify-center leading-[normal] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[72.02px]">
        <p className="mb-0">Registrar</p>
        <p>recebimento</p>
      </div>
    </div>
  );
}

function Data34() {
  return (
    <div className="absolute content-stretch flex gap-[6px] items-center left-[1231.86px] right-[10px] top-[8px]" data-name="Data">
      <Container81 />
      <Container82 />
    </div>
  );
}

function Row6() {
  return (
    <div className="bg-[#f0f4f8] h-[48px] relative shrink-0 w-full" data-name="Row">
      <Data28 />
      <Data29 />
      <Data30 />
      <Data31 />
      <Data32 />
      <Data33 />
      <Data34 />
    </div>
  );
}

function Body1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Body">
      <Row5 />
      <Row6 />
    </div>
  );
}

function Table1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Table">
      <Header1 />
      <Body1 />
    </div>
  );
}

function Background13() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start overflow-clip relative rounded-[8px] shrink-0 w-full" data-name="Background">
      <Table1 />
    </div>
  );
}

function Container83() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-gray-500 w-[301.58px]">
        <p className="leading-[normal]">Mostrando 1–2 de 2 contratos com pendência documental</p>
      </div>
    </div>
  );
}

function Container84() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-gray-500 w-[283.69px]">
        <p className="leading-[normal]">Classificação por prazo limite (mais urgentes primeiro)</p>
      </div>
    </div>
  );
}

function Container85() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container83 />
      <Container84 />
    </div>
  );
}

function Margin4() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-0 pt-[4px] px-0 relative shrink-0 w-full" data-name="Margin">
      <Container85 />
    </div>
  );
}

function Background14() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Background">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-start pb-[8px] pt-[12px] px-[12px] relative w-full">
          <Margin3 />
          <Background13 />
          <Margin4 />
        </div>
      </div>
    </div>
  );
}

function Container86() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[17px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[14px] w-[207.42px]">
        <p className="leading-[normal]">Alertas de contratos sem fiscal</p>
      </div>
    </div>
  );
}

function Container87() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 w-[181.09px]">
        <p className="leading-[normal]">1 contrato sem fiscal designado</p>
      </div>
    </div>
  );
}

function Container88() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 w-[6.75px]">
        <p className="leading-[normal]">•</p>
      </div>
    </div>
  );
}

function Container89() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[96.72px]">
        <p className="leading-[normal]">Gerenciar fiscais</p>
      </div>
    </div>
  );
}

function Container90() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <Container87 />
      <Container88 />
      <Container89 />
    </div>
  );
}

function Container91() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container86 />
      <Container90 />
    </div>
  );
}

function Margin5() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[4px] pt-0 px-0 relative shrink-0 w-full" data-name="Margin">
      <Container91 />
    </div>
  );
}

function Cell14() {
  return (
    <div className="box-border content-stretch flex flex-col items-start px-[10px] py-[8px] relative shrink-0 w-[178.42px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[45.67px]">
        <p className="leading-[normal]">Número</p>
      </div>
    </div>
  );
}

function Cell15() {
  return (
    <div className="box-border content-stretch flex flex-col items-start px-[10px] py-[8px] relative shrink-0 w-[446.08px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[37.91px]">
        <p className="leading-[normal]">Objeto</p>
      </div>
    </div>
  );
}

function Cell16() {
  return (
    <div className="box-border content-stretch flex flex-col items-start px-[10px] py-[8px] relative shrink-0 w-[267.64px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[58.72px]">
        <p className="leading-[normal]">Secretaria</p>
      </div>
    </div>
  );
}

function Cell17() {
  return (
    <div className="box-border content-stretch flex flex-col items-start px-[10px] py-[8px] relative shrink-0 w-[178.42px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[82.3px]">
        <p className="leading-[normal]">Início vigência</p>
      </div>
    </div>
  );
}

function Cell18() {
  return (
    <div className="box-border content-stretch flex flex-col items-start px-[10px] py-[8px] relative shrink-0 w-[148.69px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[50px]">
        <p className="leading-[normal]">Situação</p>
      </div>
    </div>
  );
}

function Cell19() {
  return (
    <div className="box-border content-stretch flex flex-col items-start px-[10px] py-[8px] relative shrink-0 w-[148.75px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[36.11px]">
        <p className="leading-[normal]">Ações</p>
      </div>
    </div>
  );
}

function Row7() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Row">
      <Cell14 />
      <Cell15 />
      <Cell16 />
      <Cell17 />
      <Cell18 />
      <Cell19 />
    </div>
  );
}

function Header2() {
  return (
    <div className="bg-[#e9f7ee] content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Header">
      <Row7 />
    </div>
  );
}

function Data35() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[22px] pt-[8px] px-[10px] relative shrink-0 w-[178.42px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[60.77px]">
        <p className="leading-[normal]">089/2025</p>
      </div>
    </div>
  );
}

function Data36() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[22px] pt-[8px] px-[10px] relative shrink-0 w-[446.08px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[407.78px]">
        <p className="leading-[normal]">Serviços de manutenção de ar-condicionado em prédios públicos.</p>
      </div>
    </div>
  );
}

function Data37() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[22px] pt-[8px] px-[10px] relative shrink-0 w-[267.64px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[169.14px]">
        <p className="leading-[normal]">Secretaria de Infraestrutura</p>
      </div>
    </div>
  );
}

function Data38() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[22px] pt-[8px] px-[10px] relative shrink-0 w-[178.42px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[70.86px]">
        <p className="leading-[normal]">01/03/2025</p>
      </div>
    </div>
  );
}

function Background15() {
  return (
    <div className="bg-red-600 box-border content-stretch flex items-center justify-center min-w-[80px] px-[12.67px] py-[2px] relative rounded-[999px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-center text-white w-[54.66px]">
        <p className="leading-[normal]">Sem fiscal</p>
      </div>
    </div>
  );
}

function Data39() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[20px] pt-[8px] px-[10px] relative shrink-0 w-[148.69px]" data-name="Data">
      <Background15 />
    </div>
  );
}

function Container92() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pl-0 pr-[23.11px] py-0 relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[30px] justify-center leading-[normal] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[39.44px]">
        <p className="mb-0">Indicar</p>
        <p>fiscal</p>
      </div>
    </div>
  );
}

function Container93() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pl-0 pr-[12.11px] py-0 relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[30px] justify-center leading-[normal] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[48.09px]">
        <p className="mb-0">Ver</p>
        <p>contrato</p>
      </div>
    </div>
  );
}

function Data40() {
  return (
    <div className="box-border content-stretch flex gap-[6px] items-center pl-[10px] pr-0 py-0 relative shrink-0 w-[138.75px]" data-name="Data">
      <Container92 />
      <Container93 />
    </div>
  );
}

function BodyRow() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Body → Row">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex items-center justify-center pl-0 pr-[10px] py-0 relative w-full">
          <Data35 />
          <Data36 />
          <Data37 />
          <Data38 />
          <Data39 />
          <Data40 />
        </div>
      </div>
    </div>
  );
}

function Table2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Table">
      <Header2 />
      <BodyRow />
    </div>
  );
}

function Background16() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start overflow-clip relative rounded-[8px] shrink-0 w-full" data-name="Background">
      <Table2 />
    </div>
  );
}

function Container94() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-gray-500 w-[199.73px]">
        <p className="leading-[normal]">Mostrando 1–1 de 1 contrato sem fiscal</p>
      </div>
    </div>
  );
}

function Container95() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-gray-500 w-[217.63px]">
        <p className="leading-[normal]">Priorizar contratos com maior valor global</p>
      </div>
    </div>
  );
}

function Container96() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container94 />
      <Container95 />
    </div>
  );
}

function Margin6() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-0 pt-[4px] px-0 relative shrink-0 w-full" data-name="Margin">
      <Container96 />
    </div>
  );
}

function Background17() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Background">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-start pb-[8px] pt-[12px] px-[12px] relative w-full">
          <Margin5 />
          <Background16 />
          <Margin6 />
        </div>
      </div>
    </div>
  );
}

function Container97() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[17px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[14px] w-[377.44px]">
        <p className="leading-[normal]">Alertas de valores ultrapassados no empenho (opcional)</p>
      </div>
    </div>
  );
}

function Container98() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 w-[274.44px]">
        <p className="leading-[normal]">0 contratos com valor empenhado ultrapassado</p>
      </div>
    </div>
  );
}

function Container99() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 w-[6.75px]">
        <p className="leading-[normal]">•</p>
      </div>
    </div>
  );
}

function Container100() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[200.94px]">
        <p className="leading-[normal]">Ativar acompanhamento financeiro</p>
      </div>
    </div>
  );
}

function Container101() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <Container98 />
      <Container99 />
      <Container100 />
    </div>
  );
}

function Container102() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container97 />
      <Container101 />
    </div>
  );
}

function Margin7() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[4px] pt-0 px-0 relative shrink-0 w-full" data-name="Margin">
      <Container102 />
    </div>
  );
}

function Cell20() {
  return (
    <div className="box-border content-stretch flex flex-col items-start px-[10px] py-[8px] relative shrink-0 w-[174.63px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[45.67px]">
        <p className="leading-[normal]">Número</p>
      </div>
    </div>
  );
}

function Cell21() {
  return (
    <div className="box-border content-stretch flex flex-col items-start px-[10px] py-[8px] relative shrink-0 w-[378.38px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[37.91px]">
        <p className="leading-[normal]">Objeto</p>
      </div>
    </div>
  );
}

function Cell22() {
  return (
    <div className="box-border content-stretch flex flex-col items-start px-[10px] py-[8px] relative shrink-0 w-[174.63px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[95.3px]">
        <p className="leading-[normal]">Valor contratado</p>
      </div>
    </div>
  );
}

function Cell23() {
  return (
    <div className="box-border content-stretch flex flex-col items-start px-[10px] py-[8px] relative shrink-0 w-[174.63px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[100.89px]">
        <p className="leading-[normal]">Valor empenhado</p>
      </div>
    </div>
  );
}

function Cell24() {
  return (
    <div className="box-border content-stretch flex flex-col items-start px-[10px] py-[8px] relative shrink-0 w-[174.63px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[55.5px]">
        <p className="leading-[normal]">Diferença</p>
      </div>
    </div>
  );
}

function Cell25() {
  return (
    <div className="box-border content-stretch flex flex-col items-start px-[10px] py-[8px] relative shrink-0 w-[145.53px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[50px]">
        <p className="leading-[normal]">Situação</p>
      </div>
    </div>
  );
}

function Cell26() {
  return (
    <div className="box-border content-stretch flex flex-col items-start px-[10px] py-[8px] relative shrink-0 w-[145.59px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[36.11px]">
        <p className="leading-[normal]">Ações</p>
      </div>
    </div>
  );
}

function Row8() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Row">
      <Cell20 />
      <Cell21 />
      <Cell22 />
      <Cell23 />
      <Cell24 />
      <Cell25 />
      <Cell26 />
    </div>
  );
}

function Header3() {
  return (
    <div className="bg-[#e9f7ee] content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Header">
      <Row8 />
    </div>
  );
}

function Data41() {
  return (
    <div className="relative shrink-0 w-full" data-name="Data">
      <div className="flex flex-col items-center size-full">
        <div className="box-border content-stretch flex flex-col items-center px-[10px] py-[8px] relative w-full">
          <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] text-center w-[615.34px]">
            <p className="leading-[normal]">Nenhum contrato com alerta financeiro no momento. Configure limites para iniciar o monitoramento.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BodyRow1() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Body → Row">
      <Data41 />
    </div>
  );
}

function Table3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Table">
      <Header3 />
      <BodyRow1 />
    </div>
  );
}

function Background18() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start overflow-clip relative rounded-[8px] shrink-0 w-full" data-name="Background">
      <Table3 />
    </div>
  );
}

function Container103() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-gray-500 w-[316.31px]">
        <p className="leading-[normal]">Monitoramento opcional baseado em parâmetros financeiros</p>
      </div>
    </div>
  );
}

function Container104() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-gray-500 w-[211.16px]">
        <p className="leading-[normal]">{`Configurações em "Parâmetros e perfis"`}</p>
      </div>
    </div>
  );
}

function Container105() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container103 />
      <Container104 />
    </div>
  );
}

function Margin8() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-0 pt-[4px] px-0 relative shrink-0 w-full" data-name="Margin">
      <Container105 />
    </div>
  );
}

function Background19() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Background">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-start pb-[8px] pt-[12px] px-[12px] relative w-full">
          <Margin7 />
          <Background18 />
          <Margin8 />
        </div>
      </div>
    </div>
  );
}

function Main() {
  return (
    <div className="bg-[#f6f8fa] h-[953px] relative shrink-0 w-full" data-name="Main">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] h-[953px] items-start pb-[8px] pt-[16px] px-[24px] relative w-full">
          <Container44 />
          <Background5 />
          <Background10 />
          <Background14 />
          <Background17 />
          <Background19 />
        </div>
      </div>
    </div>
  );
}

function Container106() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#e6f7ee] text-[11px] w-[474.2px]">
        <p className="leading-[normal]">© Controladoria Geral do Município de Jardim - CE • Portal Interno de Gestão de Contratos</p>
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

function Container107() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Container">
      <Link />
      <Link1 />
      <Link2 />
      <Link3 />
    </div>
  );
}

function Background20() {
  return (
    <div className="bg-[#0a4e33] relative shrink-0 w-full" data-name="Background">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center justify-between px-[32px] py-[10px] relative w-full">
          <Container106 />
          <Container107 />
        </div>
      </div>
    </div>
  );
}

export default function Background21() {
  return (
    <div className="bg-[#f6f8fa] content-stretch flex flex-col items-start justify-between relative size-full" data-name="Background">
      <Background1 />
      <Background4 />
      <Main />
      <Background20 />
    </div>
  );
}