package testandopoo;
public class Carro {
    private String nome;
    private int ano;
    private int novoano;

    public String getNome() {
        return this.nome;
    }
    public int getAno() {
        return this.ano;
    }

    public void renovar(int novoano) {
        if (novoano <= 2025 && novoano > this.ano) {
            this.ano = novoano;
            System.out.println("O novo ano do seu carro é: " + this.ano);
        } else {
            System.out.println("Opa! Ocorreu um erro. O carro só pode ser renovado para anos posteriores ao do carro com o limite máximo ao ano atual. Por isso, o ano do seu carro continua sendo " + ano);
        }
        this.novoano = novoano;
    }

    Carro(String nome, int ano) {
        this.nome = nome;
        this.ano = ano;
    }



}



