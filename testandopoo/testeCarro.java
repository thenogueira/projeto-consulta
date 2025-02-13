package testandopoo;
import java.lang.reflect.Array;
import java.util.Scanner;
import java.util.ArrayList;
public class testeCarro {
    public static void main(String[] args) {
        Scanner entrada = new Scanner(System.in);
        ArrayList<Carro> carros = new ArrayList<>();

        while (true) {
        System.out.println("**Sistema de Cadastramento e Renovação de Veículos.**");
        System.out.println("1: Adicionar um Carro.");
        System.out.println("2: Listar os carros.");
        System.out.println("3: Renovar o ano de um carro.");
        System.out.println("4: Sair.");
        System.out.println("Escolha uma opção: ");
        int opcao = entrada.nextInt();
        entrada.nextLine();

        switch (opcao) {
            case 1: //add
                System.out.println("\nQual o nome do seu carro?");
                String nomeInserido = entrada.nextLine();

                int anoInserido;
                while (true) {
                    System.out.println("Digite o ano do veículo (entre 1900 e 2025)");
                    if (entrada.hasNextInt()) {
                        anoInserido = entrada.nextInt();

                        if (anoInserido > 1900 && anoInserido <= 2025) break;
                    } else {
                        entrada.next();
                    }
                    System.out.println("Ano inválido. Tente Novamente.");
                }

                carros.add(new Carro(nomeInserido, anoInserido));
                System.out.println("Carro inserido com Sucesso!");
            break;

            case 2: //lista
                if (carros.isEmpty()) {
                    System.out.println("Nenhum carro cadastrado.");
                    break;
                } else {
                    System.out.println("\nLista de carros cadastrados: ");

                    for (int i = 0; i < carros.size(); i++) {
                        System.out.println((i+1) + "º" + carros.get(i).getNome() + " - " + carros.get(i).getAno());
                    }
                }
            break;

            case 3: //renovar
                if (carros.isEmpty()) {
                    System.out.println("Nenhum carro cadastrado.");
                    break;
                } else {
                     for (int i = 0; i < carros.size(); i++) {
                         System.out.println((i+1) + "º" + carros.get(i).getNome() + " - " + carros.get(i).getAno());
                     }
                    System.out.println("Insira o número correspondente ao carro que você quer renovar: ");
                    int escolher = entrada.nextInt();

                    if (escolher >= 1 && escolher <= carros.size()) {
                        Carro carroSelecionado = carros.get(escolher - 1);

                        int novoAno;
                        while (true) {
                            System.out.println("Para que ano deseja renovar?: ");
                            if (entrada.hasNextInt()) {
                                novoAno = entrada.nextInt();

                                if (novoAno > carroSelecionado.getAno() && novoAno <= 2025) break;
                            } else {
                                entrada.next();

                            }
                            System.out.println("Ano inválido! Digite novamente.");
                        }
                        carroSelecionado.renovar(novoAno);
                    } else {
                        System.out.println("Opção Inválido.");
                    }
                }
            break;

            case 4: //sair
                System.out.println("Sessão Finalizada.");
                entrada.close();
                return;

            default:
                System.out.println("Opção Inválida. Tente novamente.");
        }}
    }
}










































