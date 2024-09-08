import logotipoForDark from "@/assets/logotipo-mint-for-dark.svg";
import logotipoForLight from "@/assets/logotipo-mint-for-light.svg";

import { Navbar } from "@/components/navbar";

export function About() {
  return(
    <div className="h-screen p-16 flex flex-col justify-between">
      <img 
        src={logotipoForDark} 
        alt="Logotipo Penny"
        className="w-44 hidden dark:block"
      />

      <img 
        src={logotipoForLight} 
        alt="Logotipo Penny"
        className="w-44 block dark:hidden"
      /> 

      <div className="space-y-10">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">
            Nossa história
          </h1>

          <p>
            Penny é uma aplicação de gerenciamento financeiro fundada em 2024. Desenvolvida com as mais 
            requisitadas tecnologias do mercado, como JavaScript, Node.js, TailwindCSS, ShadCN-UI, React 
            e TypeScript, Penny oferece uma experiência completa para controle financeiro. Entre suas 
            funcionalidades, estão o registro de transações, resumos detalhados, métricas financeiras, 
            sistema de login seguro, filtros avançados e muito mais. Com Penny, gerenciar suas finanças 
            se torna simples e eficiente, utilizando o que há de melhor em tecnologia.
            <br/>
            <br/>
            Penny é também um projeto pessoal, desenvolvido por Pedro Santos <code className="py-1 px-2 text-xs rounded-md bg-secondary">@pdlucs</code> com 
            a iniciativa de melhorar a vida financeira. Com a necessidade de uma ferramenta que fosse intuitiva, moderna e 
            capaz de auxiliar no controle das finanças de maneira eficiente. O resultado é uma aplicação 
            que reflete o compromisso com o aprendizado contínuo e a busca por soluções que realmente 
            façam a diferença no dia a dia.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center gap-4">
            <img 
              src="https://avatars.githubusercontent.com/pelucs" 
              alt="" 
              className="size-20 rounded-full"
            />

            <div className="text-center">
              <h1 className="font-medium">Pedro Santos</h1>
              <span className="text-muted-foreground">Founder / CEO</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Navbar/>
        <h1 className="text-muted-foreground">&copy;2024 - Penny - Todos os direitos reservados</h1>
      </div>
    </div>
  );
}