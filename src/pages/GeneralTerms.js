import React from 'react';
import { 
    IonContent, 
    IonPage,
    IonTitle,
    IonImg,
    IonThumbnail
} from '@ionic/react';

import BeautyHeader from '../components/BeautyHeader';

class GeneralTerms  extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    render(){
        return(
            <IonPage>
                <BeautyHeader/>
                    <IonContent>
                    <IonImg width="50" height="50" class="logo" src='assets/img/logo512wobg.png' />
                    <p> Conditions Générales d'Utilisations </p>
                    <p> Article 1 : Objet</p>
                    <p> Beauty Rush en sa qualité d’application Web mobile met à disposition une plateforme permettant à des professionnels du domaine de l’esthétique (coiffure, maquillage, prothésiste ongulaire…), nommés ci-après « Partenaires », de présenter et vendre leurs services en vue de leur acquisition par des consommateurs, ci-après nommés « Utilisateurs ». La mise en Ligne d’une prestation par le partenaire vaut acceptation du régime des Conditions Générales de Mise En Ligne. Dans ce cadre, Beauty Rush n’est pas partie contractante au contrat de vente. Elle ne fait, en tant que prestataire, que mettre à disposition la plateforme Beauty Rush. Elle n’est en aucun cas revendeur des prestations proposées par les partenaires sur la plateforme Beauty Rush. Beauty Rush se réserve le droit de modifier les conditions générales de mise en ligne. Dans ce cas le partenaire sera averti par mail dans un délai de 10 jours ouvrés avant l’entrée en vigueur des nouvelles conditions. Le partenaire est libre d’accepter les Conditions Générales modifiées ou de mettre fin à l’utilisation de la Plateforme Beauty Rush. Les conditions générales modifiées entrent en vigueur de plein droit et remplacent les conditions antérieures à défaut de réception d’un email indiquant le refus du partenaire dans les 5 jours ouvrés suivant la date d’information. Dans le cas où Beauty Rush recevrait un email indiquant le refus du partenaire dans le délai des 5 jours ouvrés, cela conduira à une résiliation du compte du partenaire à la date convenue entre ce dernier et Beauty Rush ou à la date d’entrée en vigueur des Conditions Générales modifiées.</p>
                    <p> Article 2 : Obligations du partenaire</p>
                    <p>Le Partenaire s’engage à fournir des informations exactes et complètes et de les maintenir à jour sur la plateforme Beauty Rush. Nous nous réservons la faculté de vérifier les informations (y compris les mises à jour) communiquées par le partenaire. Si de fausses informations ont été fournies lors de l’inscription ou si un partenaire omet de notifier un changement, Beauty Rush peut procéder à la résiliation de plein droit de l’inscription à la plateforme Beauty Rush, dans les conditions indiquées à l’article 8 des présentes conditions. A noter que les réservations en cours sont dues et doivent être réalisées. Le partenaire s’engage à proposer au minimum de façon permanente 1 prestation qui sera mise en ligne sur la plateforme Beauty Rush. Le partenaire a la possibilité de modifier ou compléter sa liste de prestations. A savoir que toute demande d’ajout est soumise à une examination préalable par Beauty Rush. La prestation ne sera qu’ajoutée à l’issue de cet examen. Beauty Rush est le propriétaire de la plateforme Beauty Rush et donc de son contenu. Le partenaire accepte que Beauty Rush pourra librement transmettre à des tiers tout ou partie des données à caractère non personnel de la Plateforme Beauty Rush, et plus particulièrement celles relatives aux Prestations. 2.1 Réservation en ligne de prestations L’utilisateur peut procéder à la prise de rendez-vous en ligne d’une prestation. En effet le client peut directement prendre rendez-vous en ligne sur Beauty Rush parmi les prestations disponibles selon les créneaux horaires du partenaire. Le partenaire s’engage à garantir l'exactitude des offres promotionnelles ainsi que des tarifs qu’il soumet à l’utilisateur. Le partenaire se doit d’accepter tous les utilisateurs passant par la plateforme Beauty Rush aux dates et créneaux horaires retenus. Tous utilisateur doit être traité à même égard qu’un client lambda.</p>
                    <p> Article 3: Contenu des commentaires</p> 
                    <p>Conformément à la législation en vigueur, il est interdit de rédiger du contenu relatif à :</p>
                    <p>- l'apologie des crimes contre l'humanité,</p>
                    <p>- la provocation à la commission d'actes de terrorisme et de leur apologie,</p>
                    <p>- l'incitation à la haine raciale, à la haine à l'égard de personnes à raison de leur sexe, de leur
                    orientation ou identité sexuelle ou de leur handicap,
                    </p>
                    <p>- la pornographie enfantine,</p>
                    <p>- atteintes à la dignité humaine.</p>
                    <p>Article 4 : Modification d'une réservation</p>
                    <p>Beauty Rush ne permet pas aux utilisateurs la modification ou l’annulation de leur réservation en ligne. En cas de réservation par un utilisateur d’une prestation qui n’est pas ou plus disponible, le partenaire s’engage à contacter le client dans les meilleurs délais et au plus tard (sauf réservation le jour même) un jour avant la date de réservation prévue afin de lui proposer une prestation équivalente, et à prévenir Beauty Rush sans délai. A savoir que Beauty Rush n’est en aucun cas responsable des dommages subis par le partenaire du fait des erreurs commises directement ou indirectement par lui.</p>
                    <p>Article 5 : Responsabilité de Beauty Rush</p>
                    <p>Beauty Rush fera ses meilleurs efforts pour sécuriser l’accès et l’utilisation de la plateforme Beauty Rush conformément aux usages de l’Internet. Beauty Rush s’engage à   mettre   en   œuvre   les   moyens   nécessaires   pour   assurer la permanence, la continuité et la qualité des services qu’elle propose. Important : Les utilisateurs s’entendent en toute liberté à partir des fiches publiées sur le site pour la réalisation d’une prestation de services, il se forme entre eux un contrat auquel Beauty Rush n’est aucunement partie. La non – exécution ou la mauvaise exécution de ce contrat entre membres ne relève pas de la responsabilité de Beauty Rush mais de celle de l’utilisateur et du partenaire qui n’a pas respecté les obligations qui découlent de l’accord qui est intervenu avec son contractant.</p>
                    <p>Article 6 : Formalités lieés à la fourniture de la prestation de services par le partenaire</p>
                    <p>Beauty Rush ne peut être tenue responsable de la collecte, du reversement ou de la notification de la TVA ou tout autre taxe ou impôt en lien avec la rémunération perçue par un partenaire de la part d’un Client. Le partenaire est seul responsable de toute déclaration auprès de l’administration fiscale et des autorités compétentes du montant de ses revenus issus des prestations qu’il aura accomplies pour le compte de particuliers à partir des fiches publiées par les membres sur le site. Beauty Rush ne pourra en aucun cas être tenue responsable d’une carence du partenaire dans ses obligations déclaratives.</p>
                    <p>Article 7 : LImite de esponsabilité</p>
                    <p>Beauty Rush ne sera responsable que des dommages qui sont la conséquence directe de tout manquement, retard ou défaut d’exécution de ses engagements aux termes du présent contrat qui lui est   exclusivement   imputable, à   l’exclusion   de   tout dommage   indirect (tels   que   notamment   perte   de bénéfice, perte de données, perte de contrat ou perte de chance). A toutes fins utiles, en cas de force majeure, il est stipulé qu’aucune des parties ne sera responsable   envers l’autre   en   cas   de   retard   ou   d’inexécution   de   ses obligations dans le cadre du présent contrat.</p>
                    <p>Article 8 : Proprité intellectuelle</p>
                    <p>Le partenaire garantit Être le propriétaire exclusif ou licencié de tous les droits de propriété intellectuelle nécessaires à la commercialisation et la distribution des services proposés. Le partenaire autorise Beauty Rush à utiliser ce contenu sur son application, ainsi que le matériel de publicité ou de marketing associé, et cela sans avoir à obtenir de permission supplémentaire. Dans le cas où, une réclamation est faite au sujet de droits de propriété intellectuelle ou contenu, le partenaire sera tenu pour responsable et se devra de rembourser les frais occasionnés par cette situation.</p>
                    <p>Article 9 : Confidentialité</p>
                    <p>Le partenaire est tenu de conserver une stricte confidentialité à l’égard de toutes les informations dont il a eu connaissance dans le cadre de la conclusion ou l’exécution du Partenariat avec Beauty Rush.</p>
                    <p>Article 10 : Engagement et résiliation</p>
                    <p>Le contrat prend effet à partir de l’acceptation par Beauty Rush de la demande d’inscription du partenaire pour une durée indéterminée. Le contrat est résiliable par l’une ou l’autre partie par l’envoi d’un mail avec accusé de réception à l’adresse suivante : 12 rue du gouverneur 75003 Paris. La fermeture du compte sera effective sous 7 jours ouvrés après la demande de résiliation. En cas de résiliation pour faute, chaque partie pourra mettre fin au contrat. La partie plaignante exposera les manquements reprochés à la partie défaillante par envoi d’une lettre recommandé avec accusé de réception et lui demandera d’y remédier sous 15 jours ouvrés. En cas de non satisfaction de la partie plaignante, le contrat sera résilié de plein doit. En cas de manquement grave, la résiliation des relations contractuelles serait encourue de plein droit et sans préavis au jour de l’envoi d’une mise en demeure adressée par LRAR.</p>
                    <p>Article 11 : Divers</p>
                    <p>Ce présent contrat est soumis au droit français et tout litige sera régit au fond par le droit français. En   cas   de   différend sur   l’interprétation   ou   l’exécution, la validité   de   l’une quelconque   des   stipulations   du  présent  contrat  et  à  défaut  d’accord  amiable entre  les parties,  le  Tribunal  de  commerce  de  (à voir)  sera seul compétent  pour trancher le  litige.</p>
                   
                                       
                    </IonContent>
            </IonPage>
        )
    }
}

export default GeneralTerms;
