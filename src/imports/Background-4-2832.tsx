import svgPaths from "./svg-dwezkrejqy";

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
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-white w-[135.95px]">
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

function Container30() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center px-[10px] py-[6px] relative rounded-[6px] shrink-0" data-name="Container">
      <div className="shrink-0 size-[16px]" data-name="Rectangle" />
      <Container29 />
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[122px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-white w-[122px]">
        <p className="leading-[normal]">Parâmetros e perfis</p>
      </div>
    </div>
  );
}

function Background3() {
  return (
    <div className="bg-[#0d612f] box-border content-stretch flex gap-[8px] items-center px-[10px] py-[6px] relative rounded-[6px] shrink-0" data-name="Background">
      <div className="shrink-0 size-[16px]" data-name="Rectangle" />
      <Container31 />
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
      <Container30 />
      <Background3 />
      <Container33 />
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
    <div className="content-stretch flex items-end justify-between relative shrink-0 w-[1711.92px]" data-name="Container">
      <Container38 />
      <Border />
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
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[21px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[18px] w-[168.08px]">
        <p className="leading-[normal]">Parâmetros e perfis</p>
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

function Background5() {
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
      <Background5 />
    </div>
  );
}

function Container43() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-gray-500 w-[503.52px]">
        <p className="leading-[normal]">Configure os tipos de usuários e parâmetros gerais de funcionamento do sistema.</p>
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
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[219.64px]">
        <p className="leading-[normal]">Ver matriz de permissões completa</p>
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
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[17px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[14px] w-[111.33px]">
        <p className="leading-[normal]">Perfis de acesso</p>
      </div>
    </div>
  );
}

function Container47() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 w-[399.38px]">
        <p className="leading-[normal]">Tipos de usuários disponíveis no sistema e escopo básico de atuação.</p>
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

function Cell() {
  return (
    <div className="box-border content-stretch flex flex-col items-start px-[10px] py-[8px] relative shrink-0 w-[246.23px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[30.16px]">
        <p className="leading-[normal]">Perfil</p>
      </div>
    </div>
  );
}

function Cell1() {
  return (
    <div className="box-border content-stretch flex flex-col items-start px-[10px] py-[8px] relative shrink-0 w-[300.95px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[57.97px]">
        <p className="leading-[normal]">Descrição</p>
      </div>
    </div>
  );
}

function Cell2() {
  return (
    <div className="box-border content-stretch flex flex-col items-start px-[10px] py-[8px] relative shrink-0 w-[410.39px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[126.3px]">
        <p className="leading-[normal]">Principais permissões</p>
      </div>
    </div>
  );
}

function Cell3() {
  return (
    <div className="box-border content-stretch flex flex-col items-start px-[10px] py-[8px] relative shrink-0 w-[246.23px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[107.45px]">
        <p className="leading-[normal]">Vinculação padrão</p>
      </div>
    </div>
  );
}

function Cell4() {
  return (
    <div className="box-border content-stretch flex flex-col items-start px-[10px] py-[8px] relative shrink-0 w-[164.19px]" data-name="Cell">
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

function Background6() {
  return (
    <div className="bg-[#e9f7ee] box-border content-stretch flex items-center px-[6px] py-[2px] relative rounded-[999px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[11px] w-[111.64px]">
        <p className="leading-[normal]">Administrador (CGM)</p>
      </div>
    </div>
  );
}

function Data() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-0 pb-[22px] pt-[8px] px-[10px] right-[1121.77px] top-0" data-name="Data">
      <Background6 />
    </div>
  );
}

function Data1() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-[246.23px] px-[10px] py-[8px] right-[820.82px] top-0" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[32px] justify-center leading-[normal] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[258.22px]">
        <p className="mb-0">Responsável pela administração global do</p>
        <p>sistema e parâmetros gerais.</p>
      </div>
    </div>
  );
}

function Data2() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-[547.19px] px-[10px] py-[8px] right-[410.42px] top-0" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[32px] justify-center leading-[normal] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[346.26px]">
        <p className="mb-0">Gerenciar usuários, parametrizar alertas, ajustar perfis e</p>
        <p>configurações gerais.</p>
      </div>
    </div>
  );
}

function Data3() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-[957.58px] pb-[24px] pt-[8px] px-[10px] right-[164.19px] top-0" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[202.45px]">
        <p className="leading-[normal]">Controladoria Geral do Município</p>
      </div>
    </div>
  );
}

function Container49() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[33.28px]">
        <p className="leading-[normal]">Editar</p>
      </div>
    </div>
  );
}

function Data4() {
  return (
    <div className="absolute content-stretch flex items-center left-[1213.81px] right-[10px] top-[8px]" data-name="Data">
      <Container49 />
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
    </div>
  );
}

function Background7() {
  return (
    <div className="bg-[#e9f7ee] box-border content-stretch flex items-center px-[6px] py-[2px] relative rounded-[999px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[11px] w-[106px]">
        <p className="leading-[normal]">Gestor de Contratos</p>
      </div>
    </div>
  );
}

function Data5() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-0 pb-[22px] pt-[8px] px-[10px] right-[1121.77px] top-0" data-name="Data">
      <Background7 />
    </div>
  );
}

function Data6() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-[246.23px] px-[10px] py-[8px] right-[820.82px] top-0" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[32px] justify-center leading-[normal] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[263.46px]">
        <p className="mb-0">Responsável pelo ciclo de vida do contrato</p>
        <p>em sua unidade.</p>
      </div>
    </div>
  );
}

function Data7() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-[547.19px] px-[10px] py-[8px] right-[410.42px] top-0" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[32px] justify-center leading-[normal] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[346.65px]">
        <p className="mb-0">Cadastrar/editar contratos, acompanhar prazos, solicitar</p>
        <p>alterações e renovação.</p>
      </div>
    </div>
  );
}

function Data8() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-[957.58px] pb-[24px] pt-[8px] px-[10px] right-[164.19px] top-0" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[156.63px]">
        <p className="leading-[normal]">Secretarias demandantes</p>
      </div>
    </div>
  );
}

function Container50() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[33.28px]">
        <p className="leading-[normal]">Editar</p>
      </div>
    </div>
  );
}

function Data9() {
  return (
    <div className="absolute content-stretch flex items-center left-[1213.81px] right-[10px] top-[8px]" data-name="Data">
      <Container50 />
    </div>
  );
}

function Row2() {
  return (
    <div className="bg-[#f0f4f8] h-[48px] relative shrink-0 w-full" data-name="Row">
      <Data5 />
      <Data6 />
      <Data7 />
      <Data8 />
      <Data9 />
    </div>
  );
}

function Background8() {
  return (
    <div className="bg-[#e9f7ee] box-border content-stretch flex items-center px-[6px] py-[2px] relative rounded-[999px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[11px] w-[101.52px]">
        <p className="leading-[normal]">Fiscal de Contratos</p>
      </div>
    </div>
  );
}

function Data10() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-0 pb-[22px] pt-[8px] px-[10px] right-[1121.77px] top-0" data-name="Data">
      <Background8 />
    </div>
  );
}

function Data11() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-[246.23px] px-[10px] py-[8px] right-[820.82px] top-0" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[32px] justify-center leading-[normal] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[243.93px]">
        <p className="mb-0">Responsável pela fiscalização técnica e</p>
        <p>registro de ocorrências.</p>
      </div>
    </div>
  );
}

function Data12() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-[547.19px] px-[10px] py-[8px] right-[410.42px] top-0" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[32px] justify-center leading-[normal] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[352.19px]">
        <p className="mb-0">Registrar ocorrências, anexar documentos e acompanhar</p>
        <p>execução contratual.</p>
      </div>
    </div>
  );
}

function Data13() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-[957.58px] pb-[24px] pt-[8px] px-[10px] right-[164.19px] top-0" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[147.27px]">
        <p className="leading-[normal]">Unidade de fiscalização</p>
      </div>
    </div>
  );
}

function Container51() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[33.28px]">
        <p className="leading-[normal]">Editar</p>
      </div>
    </div>
  );
}

function Data14() {
  return (
    <div className="absolute content-stretch flex items-center left-[1213.81px] right-[10px] top-[8px]" data-name="Data">
      <Container51 />
    </div>
  );
}

function Row3() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full" data-name="Row">
      <Data10 />
      <Data11 />
      <Data12 />
      <Data13 />
      <Data14 />
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

function Container52() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-gray-500 w-[192.66px]">
        <p className="leading-[normal]">3 perfis de acesso ativos no sistema.</p>
      </div>
    </div>
  );
}

function Container53() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-gray-500 w-[342.19px]">
        <p className="leading-[normal]">Ajustes avançados podem impactar permissões e visões de telas.</p>
      </div>
    </div>
  );
}

function Container54() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container52 />
      <Container53 />
    </div>
  );
}

function Margin1() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-0 pt-[4px] px-0 relative shrink-0 w-full" data-name="Margin">
      <Container54 />
    </div>
  );
}

function Background10() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Background">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-start pb-[8px] pt-[12px] px-[12px] relative w-full">
          <Margin />
          <Background9 />
          <Margin1 />
        </div>
      </div>
    </div>
  );
}

function Container55() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[17px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[14px] w-[208px]">
        <p className="leading-[normal]">Parâmetros de alertas e prazos</p>
      </div>
    </div>
  );
}

function Container56() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 w-[446.06px]">
        <p className="leading-[normal]">Defina os prazos padrão para avisos de vencimento e renovação de contratos.</p>
      </div>
    </div>
  );
}

function Container57() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container55 />
      <Container56 />
    </div>
  );
}

function Margin2() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[4px] pt-0 px-0 relative shrink-0 w-full" data-name="Margin">
      <Container57 />
    </div>
  );
}

function Container58() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[208.7px]">
        <p className="leading-[normal]">Alerta de vencimento (dias antes)</p>
      </div>
    </div>
  );
}

function Container59() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 w-[428.88px]">
        <p className="leading-[normal]">Prazo padrão para notificar gestores e fiscais antes do término do contrato.</p>
      </div>
    </div>
  );
}

function Container60() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[2px] items-start relative">
        <Container58 />
        <Container59 />
      </div>
    </div>
  );
}

function Container61() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative">
        <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[45.17px]">
          <p className="leading-[normal]">30 dias</p>
        </div>
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
          <Container60 />
          <Container61 />
        </div>
      </div>
    </div>
  );
}

function Container62() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[174.89px]">
        <p className="leading-[normal]">Alerta crítico de vencimento</p>
      </div>
    </div>
  );
}

function Container63() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 w-[368.53px]">
        <p className="leading-[normal]">Aviso adicional para contratos próximos do vencimento imediato.</p>
      </div>
    </div>
  );
}

function Container64() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[2px] items-start relative">
        <Container62 />
        <Container63 />
      </div>
    </div>
  );
}

function Container65() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative">
        <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[36.3px]">
          <p className="leading-[normal]">7 dias</p>
        </div>
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
          <Container64 />
          <Container65 />
        </div>
      </div>
    </div>
  );
}

function Container66() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[178.53px]">
        <p className="leading-[normal]">Alerta de renovação / aditivo</p>
      </div>
    </div>
  );
}

function Container67() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 w-[392.67px]">
        <p className="leading-[normal]">Sugestão de análise prévia para renovação, aditivo ou encerramento.</p>
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

function Container69() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative">
        <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[45.2px]">
          <p className="leading-[normal]">60 dias</p>
        </div>
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
          <Container68 />
          <Container69 />
        </div>
      </div>
    </div>
  );
}

function Container70() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[181.75px]">
        <p className="leading-[normal]">Canais de notificação padrão</p>
      </div>
    </div>
  );
}

function Container71() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 w-[412.03px]">
        <p className="leading-[normal]">Formas de comunicação utilizadas para os alertas gerados pelo sistema.</p>
      </div>
    </div>
  );
}

function Container72() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[2px] items-start relative">
        <Container70 />
        <Container71 />
      </div>
    </div>
  );
}

function Container73() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative">
        <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[214.55px]">
          <p className="leading-[normal]">Painel interno e e-mail institucional</p>
        </div>
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
          <Container72 />
          <Container73 />
        </div>
      </div>
    </div>
  );
}

function Container74() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Container">
      <BackgroundBorder />
      <BackgroundBorder1 />
      <BackgroundBorder2 />
      <BackgroundBorder3 />
    </div>
  );
}

function Margin3() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-0 pt-[4px] px-0 relative shrink-0 w-full" data-name="Margin">
      <Container74 />
    </div>
  );
}

function Container75() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-gray-500 w-[504.44px]">
        <p className="leading-[normal]">Parâmetros aplicados a todos os contratos, exceto quando definido valor específico no cadastro.</p>
      </div>
    </div>
  );
}

function Svg() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="SVG">
          <path d={svgPaths.p3b397100} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" />
          <path d={svgPaths.p7410100} fill="var(--fill-0, white)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Container76() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative">
        <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-white w-[175.67px]">
          <p className="leading-[normal]">Editar parâmetros de alertas</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder4() {
  return (
    <div className="bg-[#0b6b3a] box-border content-stretch flex gap-[6px] items-center px-[13px] py-[7px] relative rounded-[6px] shrink-0" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <Svg />
      <Container76 />
    </div>
  );
}

function Container77() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container75 />
      <BackgroundBorder4 />
    </div>
  );
}

function Margin4() {
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
          <Margin2 />
          <Margin3 />
          <Margin4 />
        </div>
      </div>
    </div>
  );
}

function Main() {
  return (
    <div className="bg-[#f6f8fa] h-[654px] relative shrink-0 w-full" data-name="Main">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] h-[654px] items-start pb-[8px] pt-[16px] px-[24px] relative w-full">
          <Container45 />
          <Background10 />
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