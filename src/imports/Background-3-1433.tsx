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
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-white w-[67.8px]">
        <p className="leading-[normal]">Dashboard</p>
      </div>
    </div>
  );
}

function Background2() {
  return (
    <div className="bg-[#0d612f] box-border content-stretch flex gap-[8px] items-center px-[10px] py-[6px] relative rounded-[6px] shrink-0" data-name="Background">
      <div className="shrink-0 size-[16px]" data-name="Rectangle" />
      <Container11 />
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[96.89px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin justify-center leading-[0] not-italic relative shrink-0 text-[#e6f7ee] text-[13px] w-[96.89px]">
        <p className="leading-[normal]">Meus contratos</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center px-[10px] py-[6px] relative rounded-[6px] shrink-0" data-name="Container">
      <div className="shrink-0 size-[16px]" data-name="Rectangle" />
      <Container12 />
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
      <Background2 />
      <Container13 />
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
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#e6f7ee] text-[11px] w-[135.95px]">
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

function Background4() {
  return (
    <div className="bg-[#f0f4f8] box-border content-stretch flex flex-col items-start pl-[6px] pr-[12.23px] py-0 relative rounded-[999px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[24px] justify-center leading-[normal] not-italic relative shrink-0 text-[10px] text-gray-500 w-[36.24px]">
        <p className="mb-0">Apenas</p>
        <p>Admin</p>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center px-[10px] py-[6px] relative rounded-[6px] shrink-0" data-name="Container">
      <div className="h-[16px] shrink-0 w-[9.77px]" data-name="Rectangle" />
      <Container28 />
      <Background4 />
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
    <div className="content-stretch flex items-end justify-between relative shrink-0 w-[1768.16px]" data-name="Container">
      <Container38 />
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
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[21px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[18px] w-[93.66px]">
        <p className="leading-[normal]">Dashboard</p>
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Container">
      <Container40 />
    </div>
  );
}

function Container42() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-gray-500 w-[608.64px]">
        <p className="leading-[normal]">Visão geral dos contratos sob responsabilidade da CGM e gestores. Destaque para prazos críticos.</p>
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="Container">
      <Container41 />
      <Container42 />
    </div>
  );
}

function Border() {
  return (
    <div className="box-border content-stretch flex items-center px-[13px] py-[7px] relative rounded-[6px] shrink-0" data-name="Border">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[121.22px]">
        <p className="leading-[normal]">Ver meus contratos</p>
      </div>
    </div>
  );
}

function Container44() {
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
      <Container44 />
    </div>
  );
}

function Container45() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <Border />
      <BackgroundBorder />
    </div>
  );
}

function Container46() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container43 />
      <Container45 />
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
            <p className="leading-[normal]">Próximos 90 dias</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start min-w-[140px] relative shrink-0" data-name="Container">
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
    <div className="content-stretch flex flex-col gap-[4px] items-start min-w-[140px] relative shrink-0" data-name="Container">
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
    <div className="content-stretch flex flex-col gap-[4px] items-start min-w-[140px] relative shrink-0" data-name="Container">
      <Container51 />
      <BackgroundBorder3 />
    </div>
  );
}

function Container53() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-gray-500 w-[45.84px]">
        <p className="leading-[normal]">Situação</p>
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
          <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[218.2px]">
            <p className="leading-[normal]">Vigente, Próx. vencimento, Vencido</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container54() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start min-w-[140px] relative shrink-0" data-name="Container">
      <Container53 />
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

function Container55() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <Border1 />
      <BackgroundBorder5 />
    </div>
  );
}

function Margin() {
  return (
    <div className="box-border content-stretch flex flex-col items-end min-w-[185.83px] pl-[477.969px] pr-0 py-0 relative shrink-0 w-[663.799px]" data-name="Margin">
      <Container55 />
    </div>
  );
}

function Background6() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Background">
      <div className="flex flex-row items-end size-full">
        <div className="box-border content-stretch flex gap-[12px] items-end px-[12px] py-[10px] relative w-full">
          <Container48 />
          <Container50 />
          <Container52 />
          <Container54 />
          <Margin />
        </div>
      </div>
    </div>
  );
}

function Container56() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col items-start pl-[4px] pr-[202.27px] py-0 relative w-full">
          <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 w-[108.73px]">
            <p className="leading-[normal]">Contratos vigentes</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Background7() {
  return (
    <div className="absolute bg-[#f0f4f8] box-border content-stretch flex flex-col items-start left-[31.14px] px-[6px] py-0 rounded-[999px] top-[8px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-gray-500 w-[65.08px]">
        <p className="leading-[normal]">+4 este mês</p>
      </div>
    </div>
  );
}

function Container57() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <div className="absolute flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[24px] justify-center leading-[0] left-0 not-italic text-[#102a43] text-[20px] top-[12px] translate-y-[-50%] w-[25.14px]">
        <p className="leading-[normal]">86</p>
      </div>
      <Background7 />
    </div>
  );
}

function Container58() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-gray-500 w-[268.08px]">
        <p className="leading-[normal]">Inclui contratos com prazo acima da faixa de alerta.</p>
      </div>
    </div>
  );
}

function Background8() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col gap-[4px] items-start px-[12px] py-[10px] relative rounded-[8px] self-stretch shrink-0 w-[339px]" data-name="Background">
      <Container56 />
      <Container57 />
      <Container58 />
    </div>
  );
}

function Container59() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col items-start pl-[4px] pr-[169.73px] py-0 relative w-full">
          <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 w-[141.27px]">
            <p className="leading-[normal]">Próximos do vencimento</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Background9() {
  return (
    <div className="absolute bg-[#f0f4f8] box-border content-stretch flex flex-col items-start left-[26.75px] px-[6px] py-0 rounded-[999px] top-[8px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-gray-500 w-[91.89px]">
        <p className="leading-[normal]">Faixa: até 90 dias</p>
      </div>
    </div>
  );
}

function Container60() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <div className="absolute flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[24px] justify-center leading-[0] left-0 not-italic text-[#102a43] text-[20px] top-[12px] translate-y-[-50%] w-[20.75px]">
        <p className="leading-[normal]">19</p>
      </div>
      <Background9 />
    </div>
  );
}

function Container61() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-gray-500 w-[280.95px]">
        <p className="leading-[normal]">Recomendado revisar prorrogações e encerramentos.</p>
      </div>
    </div>
  );
}

function Background10() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col gap-[4px] items-start px-[12px] py-[10px] relative rounded-[8px] self-stretch shrink-0 w-[339px]" data-name="Background">
      <Container59 />
      <Container60 />
      <Container61 />
    </div>
  );
}

function Container62() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col items-start pl-[4px] pr-[199.34px] py-0 relative w-full">
          <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 w-[111.66px]">
            <p className="leading-[normal]">Contratos vencidos</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Background11() {
  return (
    <div className="absolute bg-[#f0f4f8] box-border content-stretch flex flex-col items-start left-[17.28px] px-[6px] py-0 rounded-[999px] top-[8px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-gray-500 w-[116.7px]">
        <p className="leading-[normal]">3 sem ação registrada</p>
      </div>
    </div>
  );
}

function Container63() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <div className="absolute flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[24px] justify-center leading-[0] left-0 not-italic text-[#102a43] text-[20px] top-[12px] translate-y-[-50%] w-[11.28px]">
        <p className="leading-[normal]">7</p>
      </div>
      <Background11 />
    </div>
  );
}

function Container64() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-gray-500 w-[276.08px]">
        <p className="leading-[normal]">Exigem registro de providências pela CGM ou gestor.</p>
      </div>
    </div>
  );
}

function Background12() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col gap-[4px] items-start px-[12px] py-[10px] relative rounded-[8px] self-stretch shrink-0 w-[339px]" data-name="Background">
      <Container62 />
      <Container63 />
      <Container64 />
    </div>
  );
}

function Container65() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 w-[175.77px]">
        <p className="leading-[normal]">Alertas pendentes de resposta</p>
      </div>
    </div>
  );
}

function Background13() {
  return (
    <div className="absolute bg-[#f0f4f8] box-border content-stretch flex flex-col items-start left-[26.39px] px-[6px] py-0 rounded-[999px] top-[8px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-gray-500 w-[85.56px]">
        <p className="leading-[normal]">Alertas e prazos</p>
      </div>
    </div>
  );
}

function Container66() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <div className="absolute flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[24px] justify-center leading-[0] left-0 not-italic text-[#102a43] text-[20px] top-[12px] translate-y-[-50%] w-[20.39px]">
        <p className="leading-[normal]">12</p>
      </div>
      <Background13 />
    </div>
  );
}

function Container67() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin justify-center leading-[normal] not-italic relative shrink-0 text-[11px] text-gray-500 w-[267.94px]">
        <p className="mb-0">{`Alertas ainda não marcados como "em tratativa" ou`}</p>
        <p>concluídos.</p>
      </div>
    </div>
  );
}

function Background14() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col gap-[4px] items-start px-[12px] py-[10px] relative rounded-[8px] self-stretch shrink-0 w-[339px]" data-name="Background">
      <Container65 />
      <Container66 />
      <Container67 />
    </div>
  );
}

function Container68() {
  return (
    <div className="content-stretch flex gap-[12px] items-start justify-center relative shrink-0 w-full" data-name="Container">
      <Background8 />
      <Background10 />
      <Background12 />
      <Background14 />
    </div>
  );
}

function Container69() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[17px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[14px] w-[213.3px]">
        <p className="leading-[normal]">Linha do tempo de vencimentos</p>
      </div>
    </div>
  );
}

function Container70() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 w-[279.09px]">
        <p className="leading-[normal]">Distribuição de contratos por mês de vencimento</p>
      </div>
    </div>
  );
}

function Container71() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container69 />
      <Container70 />
    </div>
  );
}

function Margin1() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[4px] pt-0 px-0 relative shrink-0 w-full" data-name="Margin">
      <Container71 />
    </div>
  );
}

function Container72() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-center text-gray-500 w-[18.78px]">
        <p className="leading-[normal]">Mai</p>
      </div>
    </div>
  );
}

function Container73() {
  return (
    <div className="box-border content-stretch flex flex-col items-start justify-end pb-0 pt-[4px] px-0 relative shrink-0 w-[222px]" data-name="Container">
      <Container72 />
    </div>
  );
}

function Container74() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-center text-gray-500 w-[19.3px]">
        <p className="leading-[normal]">Jun</p>
      </div>
    </div>
  );
}

function Container75() {
  return (
    <div className="box-border content-stretch flex flex-col items-start justify-end pb-0 pt-[4px] px-0 relative shrink-0 w-[222px]" data-name="Container">
      <Container74 />
    </div>
  );
}

function Container76() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-center text-gray-500 w-[15.45px]">
        <p className="leading-[normal]">Jul</p>
      </div>
    </div>
  );
}

function Container77() {
  return (
    <div className="box-border content-stretch flex flex-col items-start justify-end pb-0 pt-[4px] px-0 relative shrink-0 w-[222px]" data-name="Container">
      <Container76 />
    </div>
  );
}

function Container78() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-center text-gray-500 w-[20.94px]">
        <p className="leading-[normal]">Ago</p>
      </div>
    </div>
  );
}

function Container79() {
  return (
    <div className="box-border content-stretch flex flex-col items-start justify-end pb-0 pt-[4px] px-0 relative shrink-0 w-[222px]" data-name="Container">
      <Container78 />
    </div>
  );
}

function Container80() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-center text-gray-500 w-[17.08px]">
        <p className="leading-[normal]">Set</p>
      </div>
    </div>
  );
}

function Container81() {
  return (
    <div className="box-border content-stretch flex flex-col items-start justify-end pb-0 pt-[4px] px-0 relative shrink-0 w-[222px]" data-name="Container">
      <Container80 />
    </div>
  );
}

function Container82() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-center text-gray-500 w-[18.52px]">
        <p className="leading-[normal]">Out</p>
      </div>
    </div>
  );
}

function Container83() {
  return (
    <div className="box-border content-stretch flex flex-col items-start justify-end pb-0 pt-[4px] px-0 relative shrink-0 w-[222px]" data-name="Container">
      <Container82 />
    </div>
  );
}

function Background15() {
  return (
    <div className="bg-white h-[80px] relative rounded-[6px] shrink-0 w-full" data-name="Background">
      <div className="flex flex-row items-end justify-center size-full">
        <div className="box-border content-stretch flex gap-[4px] h-[80px] items-end justify-center px-[8px] py-[6px] relative w-full">
          <Container73 />
          <Container75 />
          <Container77 />
          <Container79 />
          <Container81 />
          <Container83 />
        </div>
      </div>
    </div>
  );
}

function Container84() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-gray-500 w-[45.63px]">
        <p className="leading-[normal]">Vigentes</p>
      </div>
    </div>
  );
}

function Container85() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Container">
      <div className="bg-green-600 rounded-[999px] shrink-0 size-[8px]" data-name="Background" />
      <Container84 />
    </div>
  );
}

function Container86() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-gray-500 w-[93px]">
        <p className="leading-[normal]">Em faixa de alerta</p>
      </div>
    </div>
  );
}

function Container87() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Container">
      <div className="bg-amber-400 rounded-[999px] shrink-0 size-[8px]" data-name="Background" />
      <Container86 />
    </div>
  );
}

function Container88() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-gray-500 w-[48.03px]">
        <p className="leading-[normal]">Vencidos</p>
      </div>
    </div>
  );
}

function Container89() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Container">
      <div className="bg-red-600 rounded-[999px] shrink-0 size-[8px]" data-name="Background" />
      <Container88 />
    </div>
  );
}

function Container90() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Container">
      <Container85 />
      <Container87 />
      <Container89 />
    </div>
  );
}

function Container91() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Container">
      <Background15 />
      <Container90 />
    </div>
  );
}

function Margin2() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-0 pt-[4px] px-0 relative shrink-0 w-full" data-name="Margin">
      <Container91 />
    </div>
  );
}

function Background16() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Background">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-start pb-[8px] pt-[12px] px-[12px] relative w-full">
          <Margin1 />
          <Margin2 />
        </div>
      </div>
    </div>
  );
}

function Container92() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[17px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[14px] w-[283.14px]">
        <p className="leading-[normal]">Secretarias fora do prazo sem providência</p>
      </div>
    </div>
  );
}

function Container93() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 w-[302.97px]">
        <p className="leading-[normal]">Contratos vencidos ou em alerta sem ação registrada</p>
      </div>
    </div>
  );
}

function Container94() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container92 />
      <Container93 />
    </div>
  );
}

function Margin3() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[4px] pt-0 px-0 relative shrink-0 w-full" data-name="Margin">
      <Container94 />
    </div>
  );
}

function Container95() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-center text-gray-500 w-[51.59px]">
        <p className="leading-[normal]">Educação</p>
      </div>
    </div>
  );
}

function Container96() {
  return (
    <div className="box-border content-stretch flex flex-col items-start justify-end pb-0 pt-[4px] px-0 relative shrink-0 w-[101.92px]" data-name="Container">
      <Container95 />
    </div>
  );
}

function Container97() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-center text-gray-500 w-[74.69px]">
        <p className="leading-[normal]">Administração</p>
      </div>
    </div>
  );
}

function Container98() {
  return (
    <div className="box-border content-stretch flex flex-col items-start justify-end pb-0 pt-[4px] px-0 relative shrink-0 w-[101.92px]" data-name="Container">
      <Container97 />
    </div>
  );
}

function Container99() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-center text-gray-500 w-[31.28px]">
        <p className="leading-[normal]">Obras</p>
      </div>
    </div>
  );
}

function Container100() {
  return (
    <div className="box-border content-stretch flex flex-col items-start justify-end pb-0 pt-[4px] px-0 relative shrink-0 w-[101.92px]" data-name="Container">
      <Container99 />
    </div>
  );
}

function Container101() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-center text-gray-500 w-[32.89px]">
        <p className="leading-[normal]">Saúde</p>
      </div>
    </div>
  );
}

function Container102() {
  return (
    <div className="box-border content-stretch flex flex-col items-start justify-end pb-0 pt-[4px] px-0 relative shrink-0 w-[101.92px]" data-name="Container">
      <Container101 />
    </div>
  );
}

function Background17() {
  return (
    <div className="bg-white box-border content-stretch flex h-[120px] items-end justify-between pl-[8px] pr-[7.97px] py-[8px] relative rounded-[6px] shrink-0 w-[435.66px]" data-name="Background">
      <Container96 />
      <Container98 />
      <Container100 />
      <Container102 />
    </div>
  );
}

function Container103() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-gray-500 w-[93px]">
        <p className="leading-[normal]">Em faixa de alerta</p>
      </div>
    </div>
  );
}

function Container104() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Container">
      <div className="bg-amber-400 rounded-[999px] shrink-0 size-[8px]" data-name="Background" />
      <Container103 />
    </div>
  );
}

function Container105() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-gray-500 w-[59.88px]">
        <p className="leading-[normal]">9 contratos</p>
      </div>
    </div>
  );
}

function Container106() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container104 />
      <Container105 />
    </div>
  );
}

function Container107() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-gray-500 w-[136.77px]">
        <p className="leading-[normal]">Vencidos sem providência</p>
      </div>
    </div>
  );
}

function Container108() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Container">
      <div className="bg-red-600 rounded-[999px] shrink-0 size-[8px]" data-name="Background" />
      <Container107 />
    </div>
  );
}

function Container109() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-gray-500 w-[59.58px]">
        <p className="leading-[normal]">5 contratos</p>
      </div>
    </div>
  );
}

function Container110() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between relative w-full">
          <Container108 />
          <Container109 />
        </div>
      </div>
    </div>
  );
}

function Background18() {
  return (
    <div className="bg-red-600 box-border content-stretch flex flex-col items-start px-[6px] py-0 relative rounded-[999px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[12px] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-white w-[75.92px]">
        <p className="leading-[normal]">Prioridade CGM</p>
      </div>
    </div>
  );
}

function Container111() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-gray-500 w-[68.41px]">
        <p className="leading-[normal]">3 secretarias</p>
      </div>
    </div>
  );
}

function Container112() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Background18 />
      <Container111 />
    </div>
  );
}

function Container113() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start min-w-[140px] relative shrink-0" data-name="Container">
      <Container106 />
      <Container110 />
      <Container112 />
    </div>
  );
}

function Container114() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <Background17 />
      <Container113 />
    </div>
  );
}

function Background19() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col gap-[8px] items-start pb-[8px] pt-[12px] px-[12px] relative rounded-[8px] self-stretch shrink-0 w-[690px]" data-name="Background">
      <Margin3 />
      <Container114 />
    </div>
  );
}

function Container115() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[17px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[14px] w-[230.45px]">
        <p className="leading-[normal]">Gestores com contratos em atraso</p>
      </div>
    </div>
  );
}

function Container116() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 w-[295.05px]">
        <p className="leading-[normal]">Responsáveis com maior quantidade de pendências</p>
      </div>
    </div>
  );
}

function Container117() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container115 />
      <Container116 />
    </div>
  );
}

function Margin4() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[4px] pt-0 px-0 relative shrink-0 w-full" data-name="Margin">
      <Container117 />
    </div>
  );
}

function Container118() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[12px] w-[72.09px]">
        <p className="leading-[normal]">João Pereira</p>
      </div>
    </div>
  );
}

function Container119() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-gray-500 w-[269.59px]">
        <p className="leading-[normal]">Secretaria de Administração • 2 vencidos sem ação</p>
      </div>
    </div>
  );
}

function Container120() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0" data-name="Container">
      <Container118 />
      <Container119 />
    </div>
  );
}

function Background20() {
  return (
    <div className="bg-red-600 box-border content-stretch flex items-center justify-center min-w-[80px] pl-[22.64px] pr-[22.66px] py-[2px] relative rounded-[999px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-center text-white w-[34.7px]">
        <p className="leading-[normal]">Crítico</p>
      </div>
    </div>
  );
}

function Container121() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-gray-500 w-[118.5px]">
        <p className="leading-[normal]">Última ação há 45 dias</p>
      </div>
    </div>
  );
}

function Container122() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-end relative shrink-0" data-name="Container">
      <Background20 />
      <Container121 />
    </div>
  );
}

function Background21() {
  return (
    <div className="bg-[#f0f4f8] relative rounded-[6px] shrink-0 w-full" data-name="Background">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center justify-between px-[6px] py-[4px] relative w-full">
          <Container120 />
          <Container122 />
        </div>
      </div>
    </div>
  );
}

function Container123() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[12px] w-[61.48px]">
        <p className="leading-[normal]">Ana Souza</p>
      </div>
    </div>
  );
}

function Container124() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-gray-500 w-[229.45px]">
        <p className="leading-[normal]">Secretaria de Obras • 1 vencido, 3 em alerta</p>
      </div>
    </div>
  );
}

function Container125() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0" data-name="Container">
      <Container123 />
      <Container124 />
    </div>
  );
}

function Background22() {
  return (
    <div className="bg-amber-400 box-border content-stretch flex items-center justify-center min-w-[80px] px-[29.61px] py-[2px] relative rounded-[999px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-black text-center w-[20.78px]">
        <p className="leading-[normal]">Alta</p>
      </div>
    </div>
  );
}

function Container126() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-gray-500 w-[123.03px]">
        <p className="leading-[normal]">Sem registro há 30 dias</p>
      </div>
    </div>
  );
}

function Container127() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-end relative shrink-0" data-name="Container">
      <Background22 />
      <Container126 />
    </div>
  );
}

function Background23() {
  return (
    <div className="bg-[#f0f4f8] relative rounded-[6px] shrink-0 w-full" data-name="Background">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center justify-between px-[6px] py-[4px] relative w-full">
          <Container125 />
          <Container127 />
        </div>
      </div>
    </div>
  );
}

function Container128() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[12px] w-[67.67px]">
        <p className="leading-[normal]">Carlos Lima</p>
      </div>
    </div>
  );
}

function Container129() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-gray-500 w-[195.08px]">
        <p className="leading-[normal]">Secretaria de Educação • 4 em alerta</p>
      </div>
    </div>
  );
}

function Container130() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0" data-name="Container">
      <Container128 />
      <Container129 />
    </div>
  );
}

function Background24() {
  return (
    <div className="bg-amber-400 box-border content-stretch flex items-center justify-center min-w-[80px] pl-[23.83px] pr-[23.84px] py-[2px] relative rounded-[999px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-black text-center w-[32.33px]">
        <p className="leading-[normal]">Média</p>
      </div>
    </div>
  );
}

function Container131() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-gray-500 w-[116.16px]">
        <p className="leading-[normal]">Última ação há 18 dias</p>
      </div>
    </div>
  );
}

function Container132() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-end relative shrink-0" data-name="Container">
      <Background24 />
      <Container131 />
    </div>
  );
}

function Background25() {
  return (
    <div className="bg-[#f0f4f8] relative rounded-[6px] shrink-0 w-full" data-name="Background">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center justify-between px-[6px] py-[4px] relative w-full">
          <Container130 />
          <Container132 />
        </div>
      </div>
    </div>
  );
}

function Container133() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[12px] w-[88.97px]">
        <p className="leading-[normal]">Fernanda Alves</p>
      </div>
    </div>
  );
}

function Container134() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-gray-500 w-[255.11px]">
        <p className="leading-[normal]">Secretaria de Saúde • 1 vencido sem providência</p>
      </div>
    </div>
  );
}

function Container135() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0" data-name="Container">
      <Container133 />
      <Container134 />
    </div>
  );
}

function Background26() {
  return (
    <div className="bg-red-600 box-border content-stretch flex items-center justify-center min-w-[80px] pl-[22.64px] pr-[22.66px] py-[2px] relative rounded-[999px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-center text-white w-[34.7px]">
        <p className="leading-[normal]">Crítico</p>
      </div>
    </div>
  );
}

function Container136() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-gray-500 w-[107.06px]">
        <p className="leading-[normal]">Sem ação registrada</p>
      </div>
    </div>
  );
}

function Container137() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-end relative shrink-0" data-name="Container">
      <Background26 />
      <Container136 />
    </div>
  );
}

function Background27() {
  return (
    <div className="bg-[#f0f4f8] relative rounded-[6px] shrink-0 w-full" data-name="Background">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center justify-between px-[6px] py-[4px] relative w-full">
          <Container135 />
          <Container137 />
        </div>
      </div>
    </div>
  );
}

function Container138() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Container">
      <Background21 />
      <Background23 />
      <Background25 />
      <Background27 />
    </div>
  );
}

function Background28() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col gap-[8px] items-start pb-[8px] pt-[12px] px-[12px] relative rounded-[8px] self-stretch shrink-0 w-[690px]" data-name="Background">
      <Margin4 />
      <Container138 />
    </div>
  );
}

function Container139() {
  return (
    <div className="content-stretch flex gap-[12px] items-start justify-center relative shrink-0 w-full" data-name="Container">
      <Background19 />
      <Background28 />
    </div>
  );
}

function Container140() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[17px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[14px] w-[234.06px]">
        <p className="leading-[normal]">Contratos próximos do vencimento</p>
      </div>
    </div>
  );
}

function Container141() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 w-[261.27px]">
        <p className="leading-[normal]">{`Faixa configurada em "Parâmetros de alertas"`}</p>
      </div>
    </div>
  );
}

function Container142() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container140 />
      <Container141 />
    </div>
  );
}

function Margin5() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[4px] pt-0 px-0 relative shrink-0 w-full" data-name="Margin">
      <Container142 />
    </div>
  );
}

function Cell() {
  return (
    <div className="box-border content-stretch flex flex-col items-start px-[8px] py-[6px] relative shrink-0 w-[168.88px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[58.72px]">
        <p className="leading-[normal]">Secretaria</p>
      </div>
    </div>
  );
}

function Cell1() {
  return (
    <div className="box-border content-stretch flex flex-col items-start px-[8px] py-[6px] relative shrink-0 w-[206.22px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[64.38px]">
        <p className="leading-[normal]">Contratado</p>
      </div>
    </div>
  );
}

function Cell2() {
  return (
    <div className="box-border content-stretch flex flex-col items-start px-[8px] py-[6px] relative shrink-0 w-[206.92px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[92.94px]">
        <p className="leading-[normal]">Objeto (resumo)</p>
      </div>
    </div>
  );
}

function Cell3() {
  return (
    <div className="box-border content-stretch flex flex-col items-start px-[8px] py-[6px] relative shrink-0 w-[83.98px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[54.31px]">
        <p className="leading-[normal]">Data final</p>
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
    <div className="box-border content-stretch flex flex-col items-start pb-[21px] pt-[6px] px-[8px] relative shrink-0 w-[168.88px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[12px] w-[135.23px]">
        <p className="leading-[normal]">Secretaria de Educação</p>
      </div>
    </div>
  );
}

function Data1() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[21px] pt-[6px] px-[8px] relative shrink-0 w-[206.22px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[12px] w-[181.92px]">
        <p className="leading-[normal]">Alfa Sistemas Educacionais S.A.</p>
      </div>
    </div>
  );
}

function Data2() {
  return (
    <div className="box-border content-stretch flex flex-col items-start px-[8px] py-[6px] relative shrink-0 w-[206.92px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[30px] justify-center leading-[normal] not-italic relative shrink-0 text-[#102a43] text-[12px] w-[174.29px]">
        <p className="mb-0">Material didático e tecnológico</p>
        <p>para rede municipal.</p>
      </div>
    </div>
  );
}

function Data3() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[21px] pt-[6px] px-[8px] relative shrink-0 w-[83.98px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[12px] w-[67.97px]">
        <p className="leading-[normal]">30/09/2025</p>
      </div>
    </div>
  );
}

function Row1() {
  return (
    <div className="bg-white content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Row">
      <Data />
      <Data1 />
      <Data2 />
      <Data3 />
    </div>
  );
}

function Data4() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[21px] pt-[6px] px-[8px] relative shrink-0 w-[168.88px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[12px] w-[113.08px]">
        <p className="leading-[normal]">Secretaria de Obras</p>
      </div>
    </div>
  );
}

function Data5() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[21px] pt-[6px] px-[8px] relative shrink-0 w-[206.22px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[12px] w-[176.16px]">
        <p className="leading-[normal]">Construtora Jardim Urbano ME</p>
      </div>
    </div>
  );
}

function Data6() {
  return (
    <div className="box-border content-stretch flex flex-col items-start px-[8px] py-[6px] relative shrink-0 w-[206.92px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[30px] justify-center leading-[normal] not-italic relative shrink-0 text-[#102a43] text-[12px] w-[174.3px]">
        <p className="mb-0">Manutenção de vias urbanas e</p>
        <p>rurais.</p>
      </div>
    </div>
  );
}

function Data7() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[21px] pt-[6px] px-[8px] relative shrink-0 w-[83.98px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[12px] w-[64.97px]">
        <p className="leading-[normal]">15/08/2025</p>
      </div>
    </div>
  );
}

function Row2() {
  return (
    <div className="bg-[#f0f4f8] content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Row">
      <Data4 />
      <Data5 />
      <Data6 />
      <Data7 />
    </div>
  );
}

function Data8() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[21px] pt-[6px] px-[8px] relative shrink-0 w-[168.88px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[12px] w-[114.84px]">
        <p className="leading-[normal]">Secretaria de Saúde</p>
      </div>
    </div>
  );
}

function Data9() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[21px] pt-[6px] px-[8px] relative shrink-0 w-[206.22px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[12px] w-[132.95px]">
        <p className="leading-[normal]">Clínica Vida Plena Ltda.</p>
      </div>
    </div>
  );
}

function Data10() {
  return (
    <div className="box-border content-stretch flex flex-col items-start px-[8px] py-[6px] relative shrink-0 w-[206.92px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[30px] justify-center leading-[normal] not-italic relative shrink-0 text-[#102a43] text-[12px] w-[100.97px]">
        <p className="mb-0">Serviços médicos</p>
        <p>especializados.</p>
      </div>
    </div>
  );
}

function Data11() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[21px] pt-[6px] px-[8px] relative shrink-0 w-[83.98px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[12px] w-[65.39px]">
        <p className="leading-[normal]">12/02/2026</p>
      </div>
    </div>
  );
}

function Row3() {
  return (
    <div className="bg-white content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Row">
      <Data8 />
      <Data9 />
      <Data10 />
      <Data11 />
    </div>
  );
}

function Data12() {
  return (
    <div className="box-border content-stretch flex flex-col items-start px-[8px] py-[6px] relative shrink-0 w-[168.88px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[30px] justify-center leading-[normal] not-italic relative shrink-0 text-[#102a43] text-[12px] w-[81.47px]">
        <p className="mb-0">Secretaria de</p>
        <p>Administração</p>
      </div>
    </div>
  );
}

function Data13() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[21px] pt-[6px] px-[8px] relative shrink-0 w-[206.22px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[12px] w-[156.25px]">
        <p className="leading-[normal]">Alpha Serviços Gerais Ltda.</p>
      </div>
    </div>
  );
}

function Data14() {
  return (
    <div className="box-border content-stretch flex flex-col items-start px-[8px] py-[6px] relative shrink-0 w-[206.92px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[30px] justify-center leading-[normal] not-italic relative shrink-0 text-[#102a43] text-[12px] w-[124.77px]">
        <p className="mb-0">Serviços de limpeza e</p>
        <p>conservação predial.</p>
      </div>
    </div>
  );
}

function Data15() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[21px] pt-[6px] px-[8px] relative shrink-0 w-[83.98px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[12px] w-[65.13px]">
        <p className="leading-[normal]">10/05/2025</p>
      </div>
    </div>
  );
}

function Row4() {
  return (
    <div className="bg-[#f0f4f8] content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Row">
      <Data12 />
      <Data13 />
      <Data14 />
      <Data15 />
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

function Background29() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start overflow-clip relative rounded-[8px] shrink-0 w-full" data-name="Background">
      <Table />
    </div>
  );
}

function Container143() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-gray-500 w-[255.06px]">
        <p className="leading-[normal]">Mostrando 1–4 de 19 contratos em faixa de alerta</p>
      </div>
    </div>
  );
}

function Container144() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[183.41px]">
        <p className="leading-[normal]">{`Ver todos em "Alertas e prazos"`}</p>
      </div>
    </div>
  );
}

function Container145() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container143 />
      <Container144 />
    </div>
  );
}

function Margin6() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-0 pt-[4px] px-0 relative shrink-0 w-full" data-name="Margin">
      <Container145 />
    </div>
  );
}

function Background30() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col gap-[8px] items-start pb-[8px] pt-[12px] px-[12px] relative rounded-[8px] shrink-0 w-[690px]" data-name="Background">
      <Margin5 />
      <Background29 />
      <Margin6 />
    </div>
  );
}

function Container146() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[17px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[14px] w-[130.27px]">
        <p className="leading-[normal]">Contratos vencidos</p>
      </div>
    </div>
  );
}

function Container147() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 w-[327.48px]">
        <p className="leading-[normal]">Ordenado por data de vencimento (mais antigos primeiro)</p>
      </div>
    </div>
  );
}

function Container148() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container146 />
      <Container147 />
    </div>
  );
}

function Margin7() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[4px] pt-0 px-0 relative shrink-0 w-full" data-name="Margin">
      <Container148 />
    </div>
  );
}

function Cell4() {
  return (
    <div className="box-border content-stretch flex flex-col items-start px-[8px] py-[6px] relative shrink-0 w-[186.47px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[58.72px]">
        <p className="leading-[normal]">Secretaria</p>
      </div>
    </div>
  );
}

function Cell5() {
  return (
    <div className="box-border content-stretch flex flex-col items-start px-[8px] py-[6px] relative shrink-0 w-[226.44px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[64.38px]">
        <p className="leading-[normal]">Contratado</p>
      </div>
    </div>
  );
}

function Cell6() {
  return (
    <div className="box-border content-stretch flex flex-col items-start px-[8px] py-[6px] relative shrink-0 w-[119.88px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[54.31px]">
        <p className="leading-[normal]">Data final</p>
      </div>
    </div>
  );
}

function Cell7() {
  return (
    <div className="box-border content-stretch flex flex-col items-start px-[8px] py-[6px] relative shrink-0 w-[133.22px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[50px]">
        <p className="leading-[normal]">Situação</p>
      </div>
    </div>
  );
}

function Row5() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Row">
      <Cell4 />
      <Cell5 />
      <Cell6 />
      <Cell7 />
    </div>
  );
}

function Header1() {
  return (
    <div className="bg-[#e9f7ee] content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Header">
      <Row5 />
    </div>
  );
}

function Data16() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[9px] pt-[6px] px-[8px] relative shrink-0 w-[186.47px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[12px] w-[160.44px]">
        <p className="leading-[normal]">Secretaria de Administração</p>
      </div>
    </div>
  );
}

function Data17() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[9px] pt-[6px] px-[8px] relative shrink-0 w-[226.44px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[12px] w-[156.25px]">
        <p className="leading-[normal]">Alpha Serviços Gerais Ltda.</p>
      </div>
    </div>
  );
}

function Data18() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[9px] pt-[6px] px-[8px] relative shrink-0 w-[119.88px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[12px] w-[65.13px]">
        <p className="leading-[normal]">10/05/2025</p>
      </div>
    </div>
  );
}

function Background31() {
  return (
    <div className="bg-red-600 box-border content-stretch flex items-center justify-center min-w-[80px] px-[6px] py-[2px] relative rounded-[999px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-center text-white w-[87.89px]">
        <p className="leading-[normal]">Sem providência</p>
      </div>
    </div>
  );
}

function Data19() {
  return (
    <div className="box-border content-stretch flex flex-col items-start px-[8px] py-[6px] relative shrink-0 w-[133.22px]" data-name="Data">
      <Background31 />
    </div>
  );
}

function Row6() {
  return (
    <div className="bg-white content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Row">
      <Data16 />
      <Data17 />
      <Data18 />
      <Data19 />
    </div>
  );
}

function Data20() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[9px] pt-[6px] px-[8px] relative shrink-0 w-[186.47px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[12px] w-[113.08px]">
        <p className="leading-[normal]">Secretaria de Obras</p>
      </div>
    </div>
  );
}

function Data21() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[9px] pt-[6px] px-[8px] relative shrink-0 w-[226.44px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[12px] w-[176.16px]">
        <p className="leading-[normal]">Construtora Jardim Urbano ME</p>
      </div>
    </div>
  );
}

function Data22() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[9px] pt-[6px] px-[8px] relative shrink-0 w-[119.88px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[12px] w-[68.19px]">
        <p className="leading-[normal]">02/04/2025</p>
      </div>
    </div>
  );
}

function Background32() {
  return (
    <div className="bg-red-600 box-border content-stretch flex items-center justify-center min-w-[80px] pl-[8.7px] pr-[8.71px] py-[2px] relative rounded-[999px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-center text-white w-[62.59px]">
        <p className="leading-[normal]">Em tratativa</p>
      </div>
    </div>
  );
}

function Data23() {
  return (
    <div className="box-border content-stretch flex flex-col items-start px-[8px] py-[6px] relative shrink-0 w-[133.22px]" data-name="Data">
      <Background32 />
    </div>
  );
}

function Row7() {
  return (
    <div className="bg-[#f0f4f8] content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Row">
      <Data20 />
      <Data21 />
      <Data22 />
      <Data23 />
    </div>
  );
}

function Data24() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[23px] pt-[6px] px-[8px] relative shrink-0 w-[186.47px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[12px] w-[114.84px]">
        <p className="leading-[normal]">Secretaria de Saúde</p>
      </div>
    </div>
  );
}

function Data25() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[23px] pt-[6px] px-[8px] relative shrink-0 w-[226.44px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[12px] w-[132.95px]">
        <p className="leading-[normal]">Clínica Vida Plena Ltda.</p>
      </div>
    </div>
  );
}

function Data26() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[23px] pt-[6px] px-[8px] relative shrink-0 w-[119.88px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[12px] w-[67.86px]">
        <p className="leading-[normal]">20/03/2025</p>
      </div>
    </div>
  );
}

function ParagraphBackground() {
  return (
    <div className="bg-red-600 box-border content-stretch flex flex-col font-['Inter:Thin',sans-serif] font-thin items-start justify-center leading-[0] min-w-[80px] not-italic pl-[6px] pr-[46.67px] py-[2px] relative rounded-[999px] shrink-0 text-[11px] text-center text-white" data-name="Paragraph+Background">
      <div className="flex flex-col h-[14px] justify-center relative shrink-0 w-[64.55px]">
        <p className="leading-[normal]">Aguardando</p>
      </div>
      <div className="flex flex-col h-[14px] justify-center relative shrink-0 w-[40.45px]">
        <p className="leading-[normal]">registro</p>
      </div>
    </div>
  );
}

function Data27() {
  return (
    <div className="box-border content-stretch flex flex-col items-start px-[8px] py-[6px] relative shrink-0 w-[133.22px]" data-name="Data">
      <ParagraphBackground />
    </div>
  );
}

function Row8() {
  return (
    <div className="bg-white content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Row">
      <Data24 />
      <Data25 />
      <Data26 />
      <Data27 />
    </div>
  );
}

function Body1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Body">
      <Row6 />
      <Row7 />
      <Row8 />
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

function Background33() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start overflow-clip relative rounded-[8px] shrink-0 w-full" data-name="Background">
      <Table1 />
    </div>
  );
}

function Container149() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-gray-500 w-[203.86px]">
        <p className="leading-[normal]">Mostrando 1–3 de 7 contratos vencidos</p>
      </div>
    </div>
  );
}

function Container150() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[120.02px]">
        <p className="leading-[normal]">Ir para lista completa</p>
      </div>
    </div>
  );
}

function Container151() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container149 />
      <Container150 />
    </div>
  );
}

function Margin8() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-0 pt-[4px] px-0 relative shrink-0 w-full" data-name="Margin">
      <Container151 />
    </div>
  );
}

function Background34() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Background">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-start pb-[8px] pt-[12px] px-[12px] relative w-full">
          <Margin7 />
          <Background33 />
          <Margin8 />
        </div>
      </div>
    </div>
  );
}

function Container152() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[17px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[14px] w-[196.11px]">
        <p className="leading-[normal]">Ações recentes em contratos</p>
      </div>
    </div>
  );
}

function Container153() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 w-[202.53px]">
        <p className="leading-[normal]">Últimas movimentações registradas</p>
      </div>
    </div>
  );
}

function Container154() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container152 />
      <Container153 />
    </div>
  );
}

function Margin9() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[4px] pt-0 px-0 relative shrink-0 w-full" data-name="Margin">
      <Container154 />
    </div>
  );
}

function Container155() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[12px] w-[421.55px]">
        <p className="leading-[normal]">
          Renovação registrada<span className="font-['Inter:Thin',sans-serif] font-thin not-italic">{` • Contrato Secretaria de Saúde / Clínica Vida Plena`}</span>
        </p>
      </div>
    </div>
  );
}

function Container156() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 w-[63.64px]">
        <p className="leading-[normal]">Hoje, 10:24</p>
      </div>
    </div>
  );
}

function Container157() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="content-stretch flex items-start justify-between relative w-full">
          <Container155 />
          <Container156 />
        </div>
      </div>
    </div>
  );
}

function Container158() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[12px] w-[483.28px]">
        <p className="leading-[normal]">
          Providência cadastrada<span className="font-['Inter:Thin',sans-serif] font-thin not-italic">{` • Contrato Secretaria de Obras / Construtora Jardim Urbano`}</span>
        </p>
      </div>
    </div>
  );
}

function Container159() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 w-[71.34px]">
        <p className="leading-[normal]">Ontem, 17:12</p>
      </div>
    </div>
  );
}

function Container160() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container158 />
      <Container159 />
    </div>
  );
}

function Container161() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[12px] w-[455.03px]">
        <p className="leading-[normal]">
          Anexo incluído<span className="font-['Inter:Thin',sans-serif] font-thin not-italic">{` • Contrato Secretaria de Educação / Alfa Sistemas Educacionais`}</span>
        </p>
      </div>
    </div>
  );
}

function Container162() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 w-[77.88px]">
        <p className="leading-[normal]">Ontem, 09:03</p>
      </div>
    </div>
  );
}

function Container163() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container161 />
      <Container162 />
    </div>
  );
}

function Container164() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Container">
      <Container157 />
      <Container160 />
      <Container163 />
    </div>
  );
}

function Container165() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-gray-500 w-[303.02px]">
        <p className="leading-[normal]">Histórico completo disponível no detalhe de cada contrato</p>
      </div>
    </div>
  );
}

function Container166() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Container">
      <Container165 />
    </div>
  );
}

function Margin10() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-0 pt-[4px] px-0 relative shrink-0 w-full" data-name="Margin">
      <Container166 />
    </div>
  );
}

function Background35() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Background">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-start pb-[8px] pt-[12px] px-[12px] relative w-full">
          <Margin9 />
          <Container164 />
          <Margin10 />
        </div>
      </div>
    </div>
  );
}

function Container167() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[690px]" data-name="Container">
      <Background34 />
      <Background35 />
    </div>
  );
}

function Container168() {
  return (
    <div className="content-stretch flex gap-[12px] items-start justify-center relative shrink-0 w-full" data-name="Container">
      <Background30 />
      <Container167 />
    </div>
  );
}

function Main() {
  return (
    <div className="bg-[#f6f8fa] h-[1039px] relative shrink-0 w-full" data-name="Main">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] h-[1039px] items-start pb-[8px] pt-[16px] px-[24px] relative w-full">
          <Container46 />
          <Background6 />
          <Container68 />
          <Background16 />
          <Container139 />
          <Container168 />
        </div>
      </div>
    </div>
  );
}

function Container169() {
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

function Container170() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Container">
      <Link />
      <Link1 />
      <Link2 />
      <Link3 />
    </div>
  );
}

function Background36() {
  return (
    <div className="bg-[#0a4e33] relative shrink-0 w-full" data-name="Background">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center justify-between px-[32px] py-[10px] relative w-full">
          <Container169 />
          <Container170 />
        </div>
      </div>
    </div>
  );
}

export default function Background37() {
  return (
    <div className="bg-[#f6f8fa] content-stretch flex flex-col items-start justify-between relative size-full" data-name="Background">
      <Background1 />
      <Background5 />
      <Main />
      <Background36 />
    </div>
  );
}