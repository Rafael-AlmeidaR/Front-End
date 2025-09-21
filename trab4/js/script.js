const resposta = [1, 3, 4];
const perguntas = [ '', 
                    'O Dióxido de Silício conduz eletricidade?',
                    'Em quais das seguintes áreas o dióxido de silício é utilizado?'
                  ];
const respostasP = [[], ['Sim, é um ótimo condutor', 'Sim, mas apenas quando dissolvido em água', 'Não, é um isolante elétrico', 'Apenas quando resfriado a baixas temperaturas'],
                     ['Construção civil', 'Indústria automotiva', 'Medicina', 'Todas as anteriores']
                   ];
const textos = ['', 
    "O dióxido de silício (SiO₂) é o principal componente da areia, presente também em rochas como o quartzo. Ele forma cristais muito estáveis e abundantes na crosta terrestre, por isso é comumente encontrado na forma de areia, arenito e quartzo.",
    "O dióxido de silício (SiO₂) não possui elétrons livres que possam se mover facilmente, então ele não conduz eletricidade. Por isso, é considerado um isolante elétrico. Essa propriedade é aproveitada, por exemplo, em chips de computador, onde o dióxido de silício funciona como isolante entre camadas condutoras de silício.",
    "O silicone, derivado do dióxido de silício (SiO₂), é um material versátil utilizado em diversas áreas: na construção civil, atua como vedante para janelas, portas e juntas; na indústria automotiva, é empregado em gaxetas, selos e mangueiras que precisam resistir a altas temperaturas e produtos químicos; e na medicina, é usado em tubos, próteses e implantes devido à sua biocompatibilidade, sendo assim útil em todas essas áreas simultaneamente."
];

function verifica(answer)
{   if(resposta[answer[0]] == answer[1]) 
    {   let containerB = document.querySelector("#quest-container");
        let container = document.createElement("div");

        let p0 = document.createElement("p");
        p0.innerHTML = textos[answer[0]+1];
        container.appendChild(p0);

        
        let b = document.createElement("button");
        b.innerHTML = "Continuar";
        b.onclick = () => generate(answer[0]+1)
        b.id = 'b0'+(answer[0]+1)
        b.className = "continue"
        container.appendChild(b);

        containerB.appendChild(container)

        document.querySelector("#p"+answer[0]+"r"+answer[1]).style.background = "green";

        for(let i = 1; (i < 5); i++)
        {   let button = document.querySelector("#p"+answer[0]+"r"+i);
            button.onclick = '';
            button.disabled = true;
        }
    }
    else
    {   let wrongButton = document.querySelector("#p"+answer[0]+"r"+answer[1]);
        wrongButton.classList.add('wrong-answer');
        setTimeout(() => {
            wrongButton.classList.remove('wrong-answer');
        }, 1000); 
    }
        console.log(answer)
}

function generate(question)
{   let bP = document.querySelector("#b0"+question);
    console.log('b0'+question, bP)
    if(question != resposta.length)
    {   let container = document.querySelector("#quest-container");
        
        let p = document.createElement("p");
        p.innerHTML = perguntas[question];
        container.appendChild(p);
    
        let d = document.createElement("div");
        d.className = "button-container";
        container.appendChild(d);
    
        for(let i = 0; (i < 4); i++)
        {   let b = document.createElement("button");
            b.innerHTML = respostasP[question][i];
            b.onclick = () => verifica([question, i+1]);
            b.id = 'p'+question+'r'+(i+1);
            d.appendChild(b);
        }  
        bP.onclick = '';
    }
    else
    {   let container = document.getElementById("container");
        let p = document.createElement("p");
        p.innerHTML = "Você terminou o quiz! parabéns!!!";
        p.style.color = "green"; 
        p.style.marginLeft = "20%";
        container.appendChild(p);
    }
    bP.disabled = true;
}