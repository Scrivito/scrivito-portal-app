import { currentLanguage, load } from 'scrivito'
import { provideLocalStorageDataClass } from '../../provideLocalStorageDataClass'
import { ReadonlyDataClassSchema } from '../../types'

async function attributes(): Promise<ReadonlyDataClassSchema> {
  const lang = await load(currentLanguage)

  const mainStatus = [
    'enum',
    lang === 'de'
      ? {
          title: 'Hauptstatus',
          values: [
            { value: 'PSA_SAP_MAI_ORD_CNC_BEA', title: 'Auftragsbearbeitung' },
            { value: 'PSA_SAP_MAI_ORD_CNC_EIN', title: 'Auftragseingang' },
            {
              value: 'PSA_SAP_MAI_QUO_ORD_PRP',
              title: 'Auftrag abgeschlossen',
            },
          ],
        }
      : {
          title: 'Main status',
          values: [
            { value: 'PSA_SAP_MAI_ORD_CNC_BEA', title: 'Order processing' },
            { value: 'PSA_SAP_MAI_ORD_CNC_EIN', title: 'Order inflow' },
            { value: 'PSA_SAP_MAI_QUO_ORD_PRP', title: 'Evaluation' },
          ],
        },
  ] as const

  const status = [
    'enum',
    lang === 'de'
      ? {
          title: 'Status',
          values: [
            { value: 'PSA_PRO_ORD_CLS', title: 'Auftrag abgeschlossen' },
            { value: 'PSA_PRO_ORD_INC', title: 'Auftragseingang' },
            { value: 'PSA_PRO_ORD_PSI_0', title: 'In ERP erfasst' },
            {
              value: 'PSA_PRO_ORD_PSI_1',
              title: 'In ERP terminiert/abgesichert',
            },
            { value: 'PSA_PRO_ORD_PSI_2', title: 'In ERP mit Rechnung' },
            { value: 'PSA_PRO_ORD_PSI_3', title: 'In ERP Teillieferung' },
            {
              value: 'PSA_PRO_ORD_PSI_4',
              title: 'In ERP Teillieferung/Teilrechnung',
            },
            {
              value: 'PSA_PRO_ORD_PSI_5',
              title: 'In ERP Teillieferung/Vollrechnung',
            },
            { value: 'PSA_PRO_ORD_PSI_6', title: 'In ERP Lieferung' },
            {
              value: 'PSA_PRO_ORD_PSI_7',
              title: 'In ERP Lieferung/Teilrechnung',
            },
            { value: 'PSA_PRO_ORD_PSI_8', title: 'In ERP storniert' },
            { value: 'PSA_PRO_ORD_PSI_9', title: 'In ERP erledigt' },
            {
              value: 'PSA_PRO_ORD_VER',
              title: 'abgelegt; auf neue Version kopiert',
            },
            { value: 'PSA_PRO_ORD_WRK', title: 'Auftrag in Bearbeitung' },
          ],
        }
      : {
          title: 'Status',
          values: [
            { value: 'PSA_PRO_ORD_CLS', title: 'order completed' },
            { value: 'PSA_PRO_ORD_INC', title: 'order entry' },
            { value: 'PSA_PRO_ORD_PSI_0', title: 'In ERP entered' },
            { value: 'PSA_PRO_ORD_PSI_1', title: 'In ERP scheduled/allocated' },
            { value: 'PSA_PRO_ORD_PSI_2', title: 'In ERP with invoice' },
            { value: 'PSA_PRO_ORD_PSI_3', title: 'In ERP partial delivery' },
            {
              value: 'PSA_PRO_ORD_PSI_4',
              title: 'In ERP partial delivery/partial invoice',
            },
            {
              value: 'PSA_PRO_ORD_PSI_5',
              title: 'In ERP partial delivery/full invoice',
            },
            { value: 'PSA_PRO_ORD_PSI_6', title: 'In ERP delivery' },
            {
              value: 'PSA_PRO_ORD_PSI_7',
              title: 'In ERP delivery/partial invoice',
            },
            { value: 'PSA_PRO_ORD_PSI_8', title: 'In ERP canceled' },
            { value: 'PSA_PRO_ORD_PSI_9', title: 'In ERP completed' },
            {
              value: 'PSA_PRO_ORD_VER',
              title: 'discarded; copied to new version',
            },
            { value: 'PSA_PRO_ORD_WRK', title: 'order in progress' },
          ],
        },
  ] as const

  const termsOfDelivery = [
    'enum',
    lang === 'de'
      ? {
          title: 'Lieferbedingungen',
          values: [
            { value: 'FOA', title: 'FOB Flughafen' },
            { value: 'FOR', title: 'Frei Waggon' },
            { value: 'PSI_TOD_DAP', title: 'Geliefert benannter Ort' },
            { value: 'PSI_TOD_DAT', title: 'Geliefert Terminal' },
            { value: 'RFC_TOD_CFR', title: 'Kosten und Fracht' },
            { value: 'RFC_TOD_CIF', title: 'Kosten, Versicherung und Fracht' },
            { value: 'RFC_TOD_CIP', title: 'frachtfrei, versichert' },
            { value: 'RFC_TOD_CPT', title: 'frachtfrei' },
            { value: 'RFC_TOD_DAF', title: 'geliefert Grenze' },
            { value: 'RFC_TOD_DCP', title: 'Frachtfrei' },
            { value: 'RFC_TOD_DDP', title: 'geliefert verzollt' },
            { value: 'RFC_TOD_DDU', title: 'geliefert unverzollt' },
            { value: 'RFC_TOD_DEQ', title: 'geliefert ab Kai' },
            { value: 'RFC_TOD_DES', title: 'geliefert ab Schiff' },
            { value: 'RFC_TOD_EXQ', title: 'Geliefert ab Kai (verzollt)' },
            { value: 'RFC_TOD_EXW', title: 'ab Werk' },
            { value: 'RFC_TOD_FAS', title: 'frei Längsseite Schiff' },
            { value: 'RFC_TOD_FCA', title: 'frei Frachtführer' },
            { value: 'RFC_TOD_FH', title: 'Frei Haus' },
            { value: 'RFC_TOD_FOB', title: 'frei an Bord' },
            { value: 'RFC_TOD_UN', title: 'Unfrei' },
          ],
        }
      : {
          title: 'Terms of delivery',
          values: [
            { value: 'FOA', title: 'FOB Airport Named airport of departure' },
            { value: 'FOR', title: 'Free on Rail Named departure point' },
            { value: 'PSI_TOD_DAP', title: 'Delivered At Place' },
            { value: 'PSI_TOD_DAT', title: 'Delivered At Terminal' },
            { value: 'RFC_TOD_CFR', title: 'cost and freight' },
            { value: 'RFC_TOD_CIF', title: 'cost, insurance & freight' },
            { value: 'RFC_TOD_CIP', title: 'carriage and insurance paid to' },
            { value: 'RFC_TOD_CPT', title: 'carriage paid to' },
            { value: 'RFC_TOD_DAF', title: 'delivered at frontier' },
            { value: 'RFC_TOD_DCP', title: '' },
            { value: 'RFC_TOD_DDP', title: 'delivered duty paid' },
            { value: 'RFC_TOD_DDU', title: 'delivered duty unpaid' },
            { value: 'RFC_TOD_DEQ', title: 'delivered ex quay' },
            { value: 'RFC_TOD_DES', title: 'delivered ex ship' },
            { value: 'RFC_TOD_EXQ', title: '' },
            { value: 'RFC_TOD_EXW', title: 'ex works' },
            { value: 'RFC_TOD_FAS', title: 'free alongside ship' },
            { value: 'RFC_TOD_FCA', title: 'free carrier' },
            { value: 'RFC_TOD_FH', title: '' },
            { value: 'RFC_TOD_FOB', title: 'free on board' },
            { value: 'RFC_TOD_UN', title: '' },
          ],
        },
  ] as const

  const termsOfPayment = [
    'enum',
    lang === 'de'
      ? {
          title: 'Zahlungsbedingungen',
          values: [
            { value: 'PSA_TOP_10', title: 'bar innerhalb von 14 Tagen' },
            { value: 'PSA_TOP_20', title: 'bar' },
            { value: 'PSA_TOP_50', title: 'per Nachnahme' },
            { value: 'PSA_TOP_60', title: 'per Bestellung' },
            { value: 'PSI_TOP_00', title: '[00] ERP Zahlungsziel' },
            { value: 'PSI_TOP_10', title: '[10] 8 Tage 2%, 30 Tage netto' },
            { value: 'PSI_TOP_20', title: '[20] sofort netto' },
            { value: 'PSI_TOP_30', title: '[30] 30 Tage netto' },
            { value: 'PSI_TOP_40', title: 'Zahlungsziel (ERP 40)' },
            { value: 'RFC_TOP_NT60', title: 'Netto 60' },
          ],
        }
      : {
          title: 'Terms of payment',
          values: [
            { value: 'PSA_TOP_10', title: 'cash payable within 14 days' },
            { value: 'PSA_TOP_20', title: 'cash' },
            { value: 'PSA_TOP_50', title: 'by C.O.D.' },
            { value: 'PSA_TOP_60', title: 'by order' },
            { value: 'PSI_TOP_00', title: '[00] ERP Payment target' },
            { value: 'PSI_TOP_10', title: '[10] 8 days 2%, 30 days net' },
            { value: 'PSI_TOP_20', title: '[20] immediate net' },
            { value: 'PSI_TOP_30', title: '[30] 30 days net' },
            { value: 'PSI_TOP_40', title: 'Payment target (ERP 40)' },
            { value: 'RFC_TOP_NT60', title: 'Net 60' },
          ],
        },
  ] as const

  const totalPriceCurrency = [
    'enum',
    lang === 'de'
      ? {
          title: 'Währung',
          values: [
            { value: 'ADP', title: 'Andorranische Peseten' },
            { value: 'AED', title: 'UAE Dirham' },
            { value: 'AFA', title: 'Afghani' },
            { value: 'AFN', title: 'Afghanischer Afghani' },
            { value: 'ALL', title: 'Lek' },
            { value: 'AMD', title: 'Armenische Dram' },
            { value: 'ANG', title: 'Niederländische Antillen Gulden' },
            { value: 'AOA', title: 'Kwanza' },
            { value: 'ARS', title: 'Argentinische Pesos' },
            { value: 'AUD', title: 'Australische Dollar' },
            { value: 'AWG', title: 'Arubanische Gulden' },
            { value: 'AZM', title: 'Aserbeidschanische Manat' },
            { value: 'AZN', title: 'Manat' },
            { value: 'BAM', title: 'Konvertible Mark' },
            { value: 'BBD', title: 'Barbados-Dollar' },
            { value: 'BDT', title: 'Taka' },
            { value: 'BGN', title: 'Bulgarische Lev' },
            { value: 'BHD', title: 'Bahrainische Dinar' },
            { value: 'BIF', title: 'Burundische Francs' },
            { value: 'BMD', title: 'Bermudische Dollar' },
            { value: 'BND', title: 'Brunei-Dollar' },
            { value: 'BOB', title: 'Boliviano' },
            { value: 'BRL', title: 'Brasilianische Real' },
            { value: 'BSD', title: 'Bahamesische Dollar' },
            { value: 'BTN', title: 'Bhutan-Ngultrum' },
            { value: 'BWP', title: 'Pula' },
            { value: 'BYR', title: 'Weißrussische Rubel' },
            { value: 'BZD', title: 'Belizische Dollar' },
            { value: 'CAD', title: 'Kanadische Dollar' },
            { value: 'CDF', title: 'Kongo-Francs' },
            { value: 'CHF', title: 'Schweizer Franken' },
            { value: 'CLP', title: 'Chilenische Pesos' },
            { value: 'CNY', title: 'Yuan Renminbi' },
            { value: 'COP', title: 'Kolumbianische Pesos' },
            { value: 'CRC', title: 'Costa Ricanische Colon' },
            { value: 'CUP', title: 'Kubanische Pesos' },
            { value: 'CVE', title: 'Kapverdische Escudos' },
            { value: 'CYP', title: 'Zypriotische Pfund' },
            { value: 'CZK', title: 'Tschechische Kronen' },
            { value: 'DEM', title: 'Deutsche Mark' },
            { value: 'DJF', title: 'Dschibutische Francs' },
            { value: 'DKK', title: 'Dänische Kronen' },
            { value: 'DOP', title: 'Dominikanische Pesos' },
            { value: 'DZD', title: 'Algerische Dinar' },
            { value: 'EEK', title: 'Estnische Kronen' },
            { value: 'EGP', title: 'Ägyptische Pfund' },
            { value: 'ERN', title: 'Nakfa' },
            { value: 'ESP', title: 'Spanische Peseten' },
            { value: 'ETB', title: 'Äthiopische Birr' },
            { value: 'EUR', title: 'Euro' },
            { value: 'FIM', title: 'Finnmark' },
            { value: 'FJD', title: 'Fidschi-Dollar' },
            { value: 'FKP', title: 'Falkländische Pfund' },
            { value: 'FRF', title: 'Französische Francs' },
            { value: 'GBP', title: 'Pfund Sterling' },
            { value: 'GEL', title: 'Lari' },
            { value: 'GHC', title: 'Cedi' },
            { value: 'GHS', title: 'Ghana Cedi' },
            { value: 'GIP', title: 'Gibraltar-Pfund' },
            { value: 'GMD', title: 'Dalasi' },
            { value: 'GNF', title: 'Guinesische Francs' },
            { value: 'GRD', title: 'Drachmen' },
            { value: 'GTQ', title: 'Quetzal' },
            { value: 'GYD', title: 'Guyana-Dollar' },
            { value: 'HKD', title: 'Hongkong-Dollar' },
            { value: 'HNL', title: 'Lempira' },
            { value: 'HRK', title: 'Kroatische Kuna' },
            { value: 'HTG', title: 'Haiti Gourde' },
            { value: 'HUF', title: 'Forint' },
            { value: 'IDR', title: 'Rupien' },
            { value: 'IEP', title: 'Irische Pfund' },
            { value: 'ILS', title: 'Neue Israelische Sheqel' },
            { value: 'INR', title: 'Indische Rupien' },
            { value: 'IQD', title: 'Irakische Dinar' },
            { value: 'IRR', title: 'Iranische Rial' },
            { value: 'ISK', title: 'Isländische Kronen' },
            { value: 'ITL', title: 'Italienische Lira' },
            { value: 'JMD', title: 'Jamaikanische Dollar' },
            { value: 'JOD', title: 'Jordanische Dinar' },
            { value: 'JPY', title: 'Yen' },
            { value: 'KES', title: 'Kenyanische Schilling' },
            { value: 'KGS', title: 'Som' },
            { value: 'KHR', title: 'Riel' },
            { value: 'KMF', title: 'Komorische Francs' },
            { value: 'KPW', title: 'Nordkoreanische Won' },
            { value: 'KRW', title: 'Won' },
            { value: 'KWD', title: 'Kuwaitische Dinar' },
            { value: 'KYD', title: 'Kaimanische Dollar' },
            { value: 'KZT', title: 'Tenge' },
            { value: 'LAK', title: 'Kip' },
            { value: 'LBP', title: 'Libanesische Pfund' },
            { value: 'LKR', title: 'Srilankische Rupien' },
            { value: 'LRD', title: 'Liberianische Dollar' },
            { value: 'LSL', title: 'Lesotho Loti' },
            { value: 'LTL', title: 'Litauische Litus' },
            { value: 'LUF', title: 'Luxemburgische Francs' },
            { value: 'LVL', title: 'Lettische Lats' },
            { value: 'LYD', title: 'Lybische Dinar' },
            { value: 'MAD', title: 'Marokkanische Dirham' },
            { value: 'MDL', title: 'Moldavische Leu' },
            { value: 'MGA', title: 'Madagaskar-Ariary' },
            { value: 'MGF', title: 'Malegassische Francs' },
            { value: 'MKD', title: 'Dinar' },
            { value: 'MMK', title: 'Kyat' },
            { value: 'MNT', title: 'Tugrik' },
            { value: 'MOP', title: 'Pataca' },
            { value: 'MRO', title: 'Ouguiya' },
            { value: 'MTL', title: 'Maltesische Lira' },
            { value: 'MUR', title: 'Mauritische Rupien' },
            { value: 'MVR', title: 'Rufiyaa' },
            { value: 'MWK', title: 'Malawi-Kwacha' },
            { value: 'MXN', title: 'Mexikanische Pesos' },
            { value: 'MYR', title: 'Malayische Ringgit' },
            { value: 'MZM', title: 'Metical' },
            { value: 'MZN', title: 'Neuer Metical' },
            { value: 'NAD', title: 'Namibische Dollar' },
            { value: 'NGN', title: 'Naira' },
            { value: 'NIO', title: 'Cordoba Oro' },
            { value: 'NLG', title: 'Niederländische Gulden' },
            { value: 'NOK', title: 'Norwegische Kronen' },
            { value: 'NPR', title: 'Nepalesische Rupien' },
            { value: 'NZD', title: 'Neuseeländische Dollar' },
            { value: 'OMR', title: 'Omanische Rial' },
            { value: 'PAB', title: 'Panama Balboa' },
            { value: 'PEN', title: 'Neue Sol' },
            { value: 'PGK', title: 'Kina' },
            { value: 'PHP', title: 'Philippinische Pesos' },
            { value: 'PKR', title: 'Pakistanische Rupien' },
            { value: 'PLN', title: 'Złoty' },
            { value: 'PYG', title: 'Guarani' },
            { value: 'QAR', title: 'Katarische Rial' },
            { value: 'ROL', title: 'Leu' },
            { value: 'RON', title: 'Rumänischer Leu (neu)' },
            { value: 'RSD', title: 'Serbische Dinar' },
            { value: 'RUB', title: 'Russischer Rubel' },
            { value: 'RUR', title: 'Russische Rubel' },
            { value: 'RWF', title: 'Ruandesische Francs' },
            { value: 'SAR', title: 'Saudische Riyal' },
            { value: 'SBD', title: 'Salomonische Dollar' },
            { value: 'SCR', title: 'Seychellische Rupien' },
            { value: 'SDD', title: 'Sudanesische Dinar' },
            { value: 'SDG', title: 'Sudanesische Pfund' },
            { value: 'SEK', title: 'Schwedische Kronen' },
            { value: 'SGD', title: 'Singapur-Dollar' },
            { value: 'SHP', title: 'Sankt-Helena-Pfund' },
            { value: 'SIT', title: 'Tolar' },
            { value: 'SKK', title: 'Slowakische Kronen' },
            { value: 'SLL', title: 'Leone' },
            { value: 'SOS', title: 'Somalische Schilling' },
            { value: 'SRD', title: 'Suriname Dollar' },
            { value: 'SRG', title: 'Surinamesische Gulden' },
            { value: 'SSP', title: 'Südsudanesische Pfund' },
            { value: 'STD', title: 'Dobra' },
            { value: 'SVC', title: 'Salvadorianische Colon' },
            { value: 'SYP', title: 'Syrische Pfund' },
            { value: 'SZL', title: 'Lilangeni' },
            { value: 'THB', title: 'Baht' },
            { value: 'TJR', title: 'Tadschikische Rubel' },
            { value: 'TJS', title: 'Tadschikistan-Somoni' },
            { value: 'TMM', title: 'Manat' },
            { value: 'TMT', title: 'Turkmenistan-Manat' },
            { value: 'TND', title: 'Tunesische Dinar' },
            { value: 'TOP', title: "Pa'anga" },
            { value: 'TRY', title: 'Türkische Lira' },
            { value: 'TTD', title: 'Trinidad-und-Tobago-Dollar' },
            { value: 'TWD', title: 'Neue Taiwanesische Dollar' },
            { value: 'TZS', title: 'Tansanische Schilling' },
            { value: 'UAH', title: 'Hryvnia' },
            { value: 'UGX', title: 'Ugandische Schilling' },
            { value: 'USD', title: 'US-Dollar' },
            { value: 'UYU', title: 'Uruguayische Pesos' },
            { value: 'UZS', title: 'Usbekische Sum' },
            { value: 'VEB', title: 'Bolivar' },
            { value: 'VEF', title: 'Venezolanischer Bolívar' },
            { value: 'VND', title: 'Dong' },
            { value: 'VUV', title: 'Vatu' },
            { value: 'WST', title: 'Tala' },
            { value: 'XAF', title: 'CFA Francs BEAC' },
            { value: 'XCD', title: 'Ostkaribische Dollar' },
            { value: 'XDR', title: 'Sonderziehungsrecht Internationaler Währ' },
            { value: 'XOF', title: 'CFA Francs BCEAO' },
            { value: 'XPF', title: 'CFP Francs' },
            { value: 'XXX', title: 'Keine Währung' },
            { value: 'YER', title: 'Jemenitische Rial' },
            { value: 'YUM', title: 'Jugoslawische Dinar' },
            { value: 'ZAR', title: 'Rand' },
            { value: 'ZMK', title: 'Sambischer Kwacha' },
            { value: 'ZMW', title: 'Neuer Sambischer Kwacha' },
            { value: 'ZWD', title: 'Simbabwische Dollar' },
            { value: 'ZWL', title: 'Simbabwe-Dollar' },
          ],
        }
      : {
          title: 'Currency',
          values: [
            { value: 'ADP', title: 'Andorran Peseta' },
            { value: 'AED', title: 'UAE Dirham' },
            { value: 'AFA', title: 'Afghani' },
            { value: 'AFN', title: 'Afghani' },
            { value: 'ALL', title: 'Lek' },
            { value: 'AMD', title: 'Armenian Dram' },
            { value: 'ANG', title: 'Netherlands Antillian Guilder' },
            { value: 'AOA', title: 'Kwanza' },
            { value: 'ARS', title: 'Argentine Peso' },
            { value: 'AUD', title: 'Australian Dollar' },
            { value: 'AWG', title: 'Aruban Guilder' },
            { value: 'AZM', title: 'Azerbaijanian Manat' },
            { value: 'AZN', title: 'Azerbaijanian Manat' },
            { value: 'BAM', title: 'Convertible Marks' },
            { value: 'BBD', title: 'Barbados Dollar' },
            { value: 'BDT', title: 'Taka' },
            { value: 'BGN', title: 'Bulgarian Lev' },
            { value: 'BHD', title: 'Bahraini Dinar' },
            { value: 'BIF', title: 'Burundi Franc' },
            { value: 'BMD', title: 'Bermudian Dollar' },
            { value: 'BND', title: 'Brunei Dollar' },
            { value: 'BOB', title: 'Boliviano' },
            { value: 'BRL', title: 'Brazilian Real' },
            { value: 'BSD', title: 'Bahamian Dollar' },
            { value: 'BTN', title: 'Bhutan-Ngultrum' },
            { value: 'BWP', title: 'Pula' },
            { value: 'BYR', title: 'Belarussian Ruble' },
            { value: 'BZD', title: 'Belize Dollar' },
            { value: 'CAD', title: 'Canadian Dollar' },
            { value: 'CDF', title: 'Franc Congolais' },
            { value: 'CHF', title: 'Swiss Franc' },
            { value: 'CLP', title: 'Chilean Peso' },
            { value: 'CNY', title: 'Yuan Renminbi' },
            { value: 'COP', title: 'Colombian Peso' },
            { value: 'CRC', title: 'Costa Rican Colon' },
            { value: 'CUP', title: 'Cuban Peso' },
            { value: 'CVE', title: 'Cape Verde Escudo' },
            { value: 'CYP', title: 'Cyprus Pound' },
            { value: 'CZK', title: 'Czech Koruna' },
            { value: 'DEM', title: 'German Mark' },
            { value: 'DJF', title: 'Djibouti Franc' },
            { value: 'DKK', title: 'Danish Krone' },
            { value: 'DOP', title: 'Dominican Peso' },
            { value: 'DZD', title: 'Algerian Dinar' },
            { value: 'EEK', title: 'Kroon' },
            { value: 'EGP', title: 'Egyptian Pound' },
            { value: 'ERN', title: 'Nakfa' },
            { value: 'ESP', title: 'Spanish Peseta' },
            { value: 'ETB', title: 'Ethiopian Birr' },
            { value: 'EUR', title: 'Euro' },
            { value: 'FIM', title: 'Markka' },
            { value: 'FJD', title: 'Fiji Dollar' },
            { value: 'FKP', title: 'Falkland Islands Pound' },
            { value: 'FRF', title: 'French Franc' },
            { value: 'GBP', title: 'Pound Sterling' },
            { value: 'GEL', title: 'Lari' },
            { value: 'GHC', title: 'Cedi' },
            { value: 'GHS', title: 'New Cedi' },
            { value: 'GIP', title: 'Gibraltar Pound' },
            { value: 'GMD', title: 'Dalasi' },
            { value: 'GNF', title: 'Guinea Franc' },
            { value: 'GRD', title: 'Drachma' },
            { value: 'GTQ', title: 'Quetzal' },
            { value: 'GYD', title: 'Guyana Dollar' },
            { value: 'HKD', title: 'Hong Kong Dollar' },
            { value: 'HNL', title: 'Lempira' },
            { value: 'HRK', title: 'Croatian kuna' },
            { value: 'HTG', title: 'Haiti Gourde' },
            { value: 'HUF', title: 'Forint' },
            { value: 'IDR', title: 'Rupiah' },
            { value: 'IEP', title: 'Irish Pound' },
            { value: 'ILS', title: 'New Israeli Sheqel' },
            { value: 'INR', title: 'Indian Rupee' },
            { value: 'IQD', title: 'Iraqi Dinar' },
            { value: 'IRR', title: 'Iranian Rial' },
            { value: 'ISK', title: 'Iceland Krona' },
            { value: 'ITL', title: 'Italian Lira' },
            { value: 'JMD', title: 'Jamaican Dollar' },
            { value: 'JOD', title: 'Jordanian Dinar' },
            { value: 'JPY', title: 'Yen' },
            { value: 'KES', title: 'Kenyan Shilling' },
            { value: 'KGS', title: 'Som' },
            { value: 'KHR', title: 'Riel' },
            { value: 'KMF', title: 'Comoro Franc' },
            { value: 'KPW', title: 'North Korean Won' },
            { value: 'KRW', title: 'Won' },
            { value: 'KWD', title: 'Kuwaiti Dinar' },
            { value: 'KYD', title: 'Cayman Islands Dollar' },
            { value: 'KZT', title: 'Tenge' },
            { value: 'LAK', title: 'Kip' },
            { value: 'LBP', title: 'Lebanese Pound' },
            { value: 'LKR', title: 'Sri Lanka Rupee' },
            { value: 'LRD', title: 'Liberian Dollar' },
            { value: 'LSL', title: 'Loti' },
            { value: 'LTL', title: 'Lithuanian Litus' },
            { value: 'LUF', title: 'Luxembourg Franc' },
            { value: 'LVL', title: 'Latvian Lats' },
            { value: 'LYD', title: 'Libyan Dinar' },
            { value: 'MAD', title: 'Moroccan Dirham' },
            { value: 'MDL', title: 'Moldovan Leu' },
            { value: 'MGA', title: 'Malagasy Ariary' },
            { value: 'MGF', title: 'Malagasy Franc' },
            { value: 'MKD', title: 'Denar' },
            { value: 'MMK', title: 'Kyat' },
            { value: 'MNT', title: 'Tugrik' },
            { value: 'MOP', title: 'Pataca' },
            { value: 'MRO', title: 'Ouguiya' },
            { value: 'MTL', title: 'Maltese Lira' },
            { value: 'MUR', title: 'Mauritius Rupee' },
            { value: 'MVR', title: 'Rufiyaa' },
            { value: 'MWK', title: 'Malawian kwacha' },
            { value: 'MXN', title: 'Mexican Peso' },
            { value: 'MYR', title: 'Malaysian Ringgit' },
            { value: 'MZM', title: 'Metical' },
            { value: 'MZN', title: 'New Metical' },
            { value: 'NAD', title: 'Namibia Dollar' },
            { value: 'NGN', title: 'Naira' },
            { value: 'NIO', title: 'Cordoba Oro' },
            { value: 'NLG', title: 'Netherlands Guilder' },
            { value: 'NOK', title: 'Norwegian Krone' },
            { value: 'NPR', title: 'Nepalese Rupee' },
            { value: 'NZD', title: 'New Zealand Dollar' },
            { value: 'OMR', title: 'Rial Omani' },
            { value: 'PAB', title: 'Balboa' },
            { value: 'PEN', title: 'Nuevo Sol' },
            { value: 'PGK', title: 'Kina' },
            { value: 'PHP', title: 'Philippine Peso' },
            { value: 'PKR', title: 'Pakistan Rupee' },
            { value: 'PLN', title: 'Złoty' },
            { value: 'PYG', title: 'Guarani' },
            { value: 'QAR', title: 'Qatari Rial' },
            { value: 'ROL', title: 'Leu' },
            { value: 'RON', title: 'Romanian New Leu' },
            { value: 'RSD', title: 'Serbian Dinar' },
            { value: 'RUB', title: 'Russian Ruble' },
            { value: 'RUR', title: 'Russian Ruble' },
            { value: 'RWF', title: 'Rwanda Franc' },
            { value: 'SAR', title: 'Saudi Riyal' },
            { value: 'SBD', title: 'Solomon Islands Dollar' },
            { value: 'SCR', title: 'Seychelles Rupee' },
            { value: 'SDD', title: 'Sudanese Dinar' },
            { value: 'SDG', title: 'Sudanese Pound' },
            { value: 'SEK', title: 'Swedish Krona' },
            { value: 'SGD', title: 'Singapore Dollar' },
            { value: 'SHP', title: 'Saint Helena Pound' },
            { value: 'SIT', title: 'Tolar' },
            { value: 'SKK', title: 'Slovak Koruna' },
            { value: 'SLL', title: 'Leone' },
            { value: 'SOS', title: 'Somali Shilling' },
            { value: 'SRD', title: 'Surinam Dollar' },
            { value: 'SRG', title: 'Suriname Guilder' },
            { value: 'SSP', title: 'South Sudanese Pound' },
            { value: 'STD', title: 'Dobra' },
            { value: 'SVC', title: 'El Salvador Colon' },
            { value: 'SYP', title: 'Syrian Pound' },
            { value: 'SZL', title: 'Lilangeni' },
            { value: 'THB', title: 'Baht' },
            { value: 'TJR', title: 'Tajik Ruble' },
            { value: 'TJS', title: 'Somoni' },
            { value: 'TMM', title: 'Manat' },
            { value: 'TMT', title: 'Turkmenistan Manat' },
            { value: 'TND', title: 'Tunisian Dinar' },
            { value: 'TOP', title: "Pa'anga" },
            { value: 'TRY', title: 'Turkish Lira' },
            { value: 'TTD', title: 'Trinidad and Tobago Dollar' },
            { value: 'TWD', title: 'New Taiwan Dollar' },
            { value: 'TZS', title: 'Tanzanian Shilling' },
            { value: 'UAH', title: 'Hryvnia' },
            { value: 'UGX', title: 'Uganda Shilling' },
            { value: 'USD', title: 'US Dollar' },
            { value: 'UYU', title: 'Peso Uruguayo' },
            { value: 'UZS', title: 'Uzbekistan Sum' },
            { value: 'VEB', title: 'Bolivar' },
            { value: 'VEF', title: 'Bolívar Fuerte' },
            { value: 'VND', title: 'Dong' },
            { value: 'VUV', title: 'Vatu' },
            { value: 'WST', title: 'Tala' },
            { value: 'XAF', title: 'CFA Franc BEAC' },
            { value: 'XCD', title: 'East Caribbean Dollar' },
            { value: 'XDR', title: 'Special Drawing Rights' },
            { value: 'XOF', title: 'CFA Franc BCEAO' },
            { value: 'XPF', title: 'CFP Franc' },
            { value: 'XXX', title: 'No currency' },
            { value: 'YER', title: 'Yemeni Rial' },
            { value: 'YUM', title: 'Yugoslavian Dinar' },
            { value: 'ZAR', title: 'Rand' },
            { value: 'ZMK', title: 'Zambian kwacha' },
            { value: 'ZMW', title: 'New Zambian Kwacha' },
            { value: 'ZWD', title: 'Zimbabwe Dollar' },
            { value: 'ZWL', title: 'Zimbabwe Dollar' },
          ],
        },
  ] as const

  const type = [
    'enum',
    lang === 'de'
      ? {
          title: 'Art',
          values: [
            { value: 'PSA_ORD_STY_GEN_OVR', title: 'Generalüberholung' },
            { value: 'PSA_ORD_STY_NEW', title: 'Neumaschine' },
            { value: 'PSA_ORD_STY_SRV', title: 'Dienstleistung' },
            { value: 'PSA_ORD_STY_STD', title: 'Anlage' },
          ],
        }
      : {
          title: 'Type',
          values: [
            { value: 'PSA_ORD_STY_GEN_OVR', title: 'General overhaul' },
            { value: 'PSA_ORD_STY_NEW', title: 'Re-equip machine' },
            { value: 'PSA_ORD_STY_SRV', title: 'Services' },
            { value: 'PSA_ORD_STY_STD', title: 'Plant' },
          ],
        },
  ] as const

  return {
    commercialAgent: [
      'reference',
      {
        title: lang === 'de' ? 'Kaufmännischer Bearbeiter' : 'Commercial agent',
        to: 'User',
      },
    ],
    customer: ['string', { title: lang === 'de' ? 'Kunde' : 'Customer' }],
    deliveryAt: [
      'date',
      { title: lang === 'de' ? 'Lieferdatum' : 'Delivery date' },
    ],
    description: [
      'string',
      { title: lang === 'de' ? 'Beschreibung' : 'Description' },
    ],
    keyword: ['string', { title: lang === 'de' ? 'Stichwort' : 'Keyword' }],
    mainStatus,
    number: ['string', { title: lang === 'de' ? 'Nummer' : 'Number' }],
    open: ['boolean', { title: lang === 'de' ? 'Offen?' : 'Open?' }],
    orderAt: ['date', { title: lang === 'de' ? 'Auftrag am' : 'Order at' }],
    quoteAt: ['date', { title: lang === 'de' ? 'Angebot am' : 'Quote at' }],
    salesPartner: [
      'string',
      { title: lang === 'de' ? 'Vertriebspartner' : 'Sales partner' },
    ],
    status,
    technicalAgent: [
      'reference',
      {
        title: lang === 'de' ? 'Technischer Bearbeiter' : 'Technical agent',
        to: 'User',
      },
    ],
    termsOfDelivery,
    termsOfPayment,
    totalPrice: ['number', { title: lang === 'de' ? 'Umsatz' : 'Revenue' }],
    totalPriceCurrency,
    type,
    url: ['string', { title: 'URL' }],
  }
}

export function localStorageOrderDataClass() {
  return provideLocalStorageDataClass('Order', {
    attributes,
    initialContent: [
      {
        _id: '137EBD84B5C0ED8EE040A8C00F0121EC',
        keyword: 'Schmieranlage für Maier Schmiertechnik',
        number: 'P-06.002843',
        type: 'PSA_ORD_STY_NEW',
        customer: 'Maier Schmiertechnik GmbH (München)',
        commercialAgent: 'F87BDC400E41D630E030A8C00D01158A',
        technicalAgent: 'F9E1B255870E5EEEE030A8C00D012D39',
        status: 'PSA_PRO_ORD_CLS',
        mainStatus: 'PSA_SAP_MAI_QUO_ORD_PRP',
        open: false,
        quoteAt: '2023-01-17T09:29:14Z',
        orderAt: '2023-06-17T22:00:00Z',
        deliveryAt: '2023-07-05T09:29:14Z',
        termsOfDelivery: 'RFC_TOD_FAS',
        termsOfPayment: 'RFC_TOP_NT60',
        totalPrice: 800959.16,
        totalPriceCurrency: 'EUR',
      },
      {
        _id: '2C7A62C9CD514B3AE040A8C00F011B04',
        keyword: '30 Ventile, 10bar',
        number: 'P-07.004451',
        type: 'PSA_ORD_STY_NEW',
        customer: 'Maier Schmiertechnik GmbH (München)',
        commercialAgent: '228C5C6067EF486FB72F8D4BAAE6AB08',
        salesPartner: 'Hono Gerätebau GmbH (Grafing)',
        status: 'PSA_PRO_ORD_CLS',
        mainStatus: 'PSA_SAP_MAI_QUO_ORD_PRP',
        open: false,
        orderAt: '2023-03-16T22:00:00Z',
        deliveryAt: '2021-12-13T11:53:08Z',
        termsOfDelivery: 'RFC_TOD_DEQ',
        termsOfPayment: 'RFC_TOP_NT60',
        totalPrice: 83121.19999694824,
        totalPriceCurrency: 'EUR',
      },
      {
        _id: '3DDF9E11BF6E1F8DE040007F01005605',
        keyword: "3 Zentralschmieranlagen 'Metallbau' für Maier Schmiertechnik",
        number: 'P-07.005675',
        type: 'PSA_ORD_STY_NEW',
        customer: 'Maier Schmiertechnik GmbH (München)',
        commercialAgent: 'F9E1B255870E5EEEE030A8C00D012D39',
        technicalAgent: '228C5C6067EF486FB72F8D4BAAE6AB08',
        status: 'PSA_PRO_ORD_CLS',
        mainStatus: 'PSA_SAP_MAI_QUO_ORD_PRP',
        open: false,
        quoteAt: '2022-08-22T13:27:03Z',
        orderAt: '2024-09-14T22:00:00Z',
        deliveryAt: '2022-10-30T10:50:38Z',
        termsOfDelivery: 'RFC_TOD_DES',
        termsOfPayment: 'RFC_TOP_NT60',
        totalPrice: 42873.010714285665,
        totalPriceCurrency: 'EUR',
      },
      {
        _id: '4076A80ED49B4D85E040007F01001A11',
        keyword: 'Schmieranlage 2, 30-12',
        number: 'P-07.005765',
        type: 'PSA_ORD_STY_NEW',
        customer: 'Maier Schmiertechnik GmbH (München)',
        commercialAgent: 'D456ACF6FF405922E030A8C02A010C68',
        salesPartner: 'Hono Gerätebau GmbH (Grafing)',
        status: 'PSA_PRO_ORD_CLS',
        mainStatus: 'PSA_SAP_MAI_QUO_ORD_PRP',
        open: false,
        quoteAt: '2023-05-13T14:30:18Z',
        orderAt: '2024-07-10T22:00:00Z',
        deliveryAt: '2023-08-18T08:19:18Z',
        termsOfDelivery: 'RFC_TOD_DAF',
        termsOfPayment: 'RFC_TOP_NT60',
        totalPrice: 60917.0,
        totalPriceCurrency: 'EUR',
      },
      {
        _id: '75A8E1411FAE4E329FE28F250EABD8E0',
        keyword: 'Auftrag Schmieranlage für Maier',
        number: 'P-20-009129',
        type: 'PSA_ORD_STY_STD',
        customer: 'Maier Schmiertechnik GmbH (München)',
        commercialAgent: '052601BEBCEC39C8E040A8C00D0107AC',
        technicalAgent: '18EEEAEC56D37397E040A8C00F012319',
        salesPartner: 'Hono Gerätebau GmbH (Grafing)',
        status: 'PSA_PRO_ORD_INC',
        mainStatus: 'PSA_SAP_MAI_ORD_CNC_EIN',
        open: true,
        quoteAt: '2023-12-10T12:48:42Z',
        orderAt: '2023-12-10T13:05:28Z',
        deliveryAt: '2023-12-18T12:00:00Z',
        termsOfDelivery: 'RFC_TOD_CFR',
        totalPrice: 25657.904761904745,
        totalPriceCurrency: 'EUR',
      },
      {
        _id: '9B47FC7F123B455FA76C1ECA012D31E5',
        keyword: '35 Ventile, 10bar',
        number: 'P-16-009003',
        type: 'PSA_ORD_STY_NEW',
        customer: 'Maier Schmiertechnik GmbH (München)',
        commercialAgent: '228C5C6067EF486FB72F8D4BAAE6AB08',
        salesPartner: 'Hono Gerätebau GmbH (Grafing)',
        status: 'PSA_PRO_ORD_INC',
        mainStatus: 'PSA_SAP_MAI_ORD_CNC_EIN',
        open: true,
        orderAt: '2022-12-24T23:00:00Z',
        deliveryAt: '2021-12-13T11:53:08Z',
        termsOfDelivery: 'RFC_TOD_DEQ',
        termsOfPayment: 'RFC_TOP_NT60',
        totalPrice: 75000.0,
        totalPriceCurrency: 'EUR',
      },
      {
        _id: 'EEDF141E8169451884B23C979526C51A',
        keyword: 'Auftrag 2 x MAX 40 über Hono',
        number: 'P-14-008810',
        type: 'PSA_ORD_STY_STD',
        customer: 'Maier Schmiertechnik GmbH (München)',
        commercialAgent: '052601BEBCEC39C8E040A8C00D0107AC',
        technicalAgent: '18EEEAEC56D37397E040A8C00F012319',
        salesPartner: 'Hono Gerätebau GmbH (Grafing)',
        status: 'PSA_PRO_ORD_INC',
        mainStatus: 'PSA_SAP_MAI_ORD_CNC_EIN',
        open: true,
        orderAt: '2024-11-08T23:00:00Z',
        deliveryAt: '2023-11-27T13:26:44Z',
        termsOfDelivery: 'RFC_TOD_CFR',
        termsOfPayment: 'PSI_TOP_40',
        totalPrice: 52043.52380952379,
        totalPriceCurrency: 'EUR',
      },
      {
        _id: 'F5F3792034404D40B41A843B61DC60D1',
        keyword: 'Zentral-Schmieranlage, Metallbau, MAX/40',
        number: 'P-11-007605',
        type: 'PSA_ORD_STY_NEW',
        customer: 'Maier Schmiertechnik GmbH (München)',
        commercialAgent: '052601BEBCEC39C8E040A8C00D0107AC',
        technicalAgent: 'D38D7FBFA277856DE030A8C02A010460',
        status: 'PSA_PRO_ORD_CLS',
        mainStatus: 'PSA_SAP_MAI_QUO_ORD_PRP',
        open: false,
        orderAt: '2024-01-02T23:00:00Z',
        deliveryAt: '2023-07-23T13:35:38Z',
        termsOfDelivery: 'RFC_TOD_DDU',
        termsOfPayment: 'RFC_TOP_NT60',
        totalPrice: 25246.476190476184,
        totalPriceCurrency: 'EUR',
      },
    ],
  })
}
