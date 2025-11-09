'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">hospital-system documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                                <li class="link">
                                    <a href="overview.html" data-type="chapter-link">
                                        <span class="icon ion-ios-keypad"></span>Overview
                                    </a>
                                </li>

                            <li class="link">
                                <a href="index.html" data-type="chapter-link">
                                    <span class="icon ion-ios-paper"></span>
                                        README
                                </a>
                            </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>

                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-fc30c6dac9bc527ab11e048967c7096627f297457a6203662a0b2fa50698faa1aa5b662416021541c65704f3f808af00cbd0aa128ab21707d9dba1f91bcbb6f8"' : 'data-bs-target="#xs-controllers-links-module-AppModule-fc30c6dac9bc527ab11e048967c7096627f297457a6203662a0b2fa50698faa1aa5b662416021541c65704f3f808af00cbd0aa128ab21707d9dba1f91bcbb6f8"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-fc30c6dac9bc527ab11e048967c7096627f297457a6203662a0b2fa50698faa1aa5b662416021541c65704f3f808af00cbd0aa128ab21707d9dba1f91bcbb6f8"' :
                                            'id="xs-controllers-links-module-AppModule-fc30c6dac9bc527ab11e048967c7096627f297457a6203662a0b2fa50698faa1aa5b662416021541c65704f3f808af00cbd0aa128ab21707d9dba1f91bcbb6f8"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-fc30c6dac9bc527ab11e048967c7096627f297457a6203662a0b2fa50698faa1aa5b662416021541c65704f3f808af00cbd0aa128ab21707d9dba1f91bcbb6f8"' : 'data-bs-target="#xs-injectables-links-module-AppModule-fc30c6dac9bc527ab11e048967c7096627f297457a6203662a0b2fa50698faa1aa5b662416021541c65704f3f808af00cbd0aa128ab21707d9dba1f91bcbb6f8"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-fc30c6dac9bc527ab11e048967c7096627f297457a6203662a0b2fa50698faa1aa5b662416021541c65704f3f808af00cbd0aa128ab21707d9dba1f91bcbb6f8"' :
                                        'id="xs-injectables-links-module-AppModule-fc30c6dac9bc527ab11e048967c7096627f297457a6203662a0b2fa50698faa1aa5b662416021541c65704f3f808af00cbd0aa128ab21707d9dba1f91bcbb6f8"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppointmentModule.html" data-type="entity-link" >AppointmentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppointmentModule-2ed986e8dd45f441a34be60bf3fb2d02f2094128c3f27ed6b95c7c1aebdfbc9dc076fadbfaff27ea578a4b669855b1edf3e515cd58dddd8aebd1b974feeaed2f"' : 'data-bs-target="#xs-controllers-links-module-AppointmentModule-2ed986e8dd45f441a34be60bf3fb2d02f2094128c3f27ed6b95c7c1aebdfbc9dc076fadbfaff27ea578a4b669855b1edf3e515cd58dddd8aebd1b974feeaed2f"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppointmentModule-2ed986e8dd45f441a34be60bf3fb2d02f2094128c3f27ed6b95c7c1aebdfbc9dc076fadbfaff27ea578a4b669855b1edf3e515cd58dddd8aebd1b974feeaed2f"' :
                                            'id="xs-controllers-links-module-AppointmentModule-2ed986e8dd45f441a34be60bf3fb2d02f2094128c3f27ed6b95c7c1aebdfbc9dc076fadbfaff27ea578a4b669855b1edf3e515cd58dddd8aebd1b974feeaed2f"' }>
                                            <li class="link">
                                                <a href="controllers/AppointmentController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppointmentController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppointmentModule-2ed986e8dd45f441a34be60bf3fb2d02f2094128c3f27ed6b95c7c1aebdfbc9dc076fadbfaff27ea578a4b669855b1edf3e515cd58dddd8aebd1b974feeaed2f"' : 'data-bs-target="#xs-injectables-links-module-AppointmentModule-2ed986e8dd45f441a34be60bf3fb2d02f2094128c3f27ed6b95c7c1aebdfbc9dc076fadbfaff27ea578a4b669855b1edf3e515cd58dddd8aebd1b974feeaed2f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppointmentModule-2ed986e8dd45f441a34be60bf3fb2d02f2094128c3f27ed6b95c7c1aebdfbc9dc076fadbfaff27ea578a4b669855b1edf3e515cd58dddd8aebd1b974feeaed2f"' :
                                        'id="xs-injectables-links-module-AppointmentModule-2ed986e8dd45f441a34be60bf3fb2d02f2094128c3f27ed6b95c7c1aebdfbc9dc076fadbfaff27ea578a4b669855b1edf3e515cd58dddd8aebd1b974feeaed2f"' }>
                                        <li class="link">
                                            <a href="injectables/AppointmentService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppointmentService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-baf05e9e88030203b0f58fb47a9f8420d6e8357a84dc0382f2b066e5d04e8bf73c908a94bc9ec22d490750f58628c21652c8ca744d29e53cd16139af0b1cc2aa"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-baf05e9e88030203b0f58fb47a9f8420d6e8357a84dc0382f2b066e5d04e8bf73c908a94bc9ec22d490750f58628c21652c8ca744d29e53cd16139af0b1cc2aa"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-baf05e9e88030203b0f58fb47a9f8420d6e8357a84dc0382f2b066e5d04e8bf73c908a94bc9ec22d490750f58628c21652c8ca744d29e53cd16139af0b1cc2aa"' :
                                            'id="xs-controllers-links-module-AuthModule-baf05e9e88030203b0f58fb47a9f8420d6e8357a84dc0382f2b066e5d04e8bf73c908a94bc9ec22d490750f58628c21652c8ca744d29e53cd16139af0b1cc2aa"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-baf05e9e88030203b0f58fb47a9f8420d6e8357a84dc0382f2b066e5d04e8bf73c908a94bc9ec22d490750f58628c21652c8ca744d29e53cd16139af0b1cc2aa"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-baf05e9e88030203b0f58fb47a9f8420d6e8357a84dc0382f2b066e5d04e8bf73c908a94bc9ec22d490750f58628c21652c8ca744d29e53cd16139af0b1cc2aa"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-baf05e9e88030203b0f58fb47a9f8420d6e8357a84dc0382f2b066e5d04e8bf73c908a94bc9ec22d490750f58628c21652c8ca744d29e53cd16139af0b1cc2aa"' :
                                        'id="xs-injectables-links-module-AuthModule-baf05e9e88030203b0f58fb47a9f8420d6e8357a84dc0382f2b066e5d04e8bf73c908a94bc9ec22d490750f58628c21652c8ca744d29e53cd16139af0b1cc2aa"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtAuthGuard.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtAuthGuard</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DoctorModule.html" data-type="entity-link" >DoctorModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-DoctorModule-d2978478ffd2a6c41f8dfdda99665573543d24619a7d39a3d78eb8f70b7ccd2b0d5bc115b3b6b45a1849a9d2256a9f936f2085795798f72e094e2c08ea058fb8"' : 'data-bs-target="#xs-controllers-links-module-DoctorModule-d2978478ffd2a6c41f8dfdda99665573543d24619a7d39a3d78eb8f70b7ccd2b0d5bc115b3b6b45a1849a9d2256a9f936f2085795798f72e094e2c08ea058fb8"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-DoctorModule-d2978478ffd2a6c41f8dfdda99665573543d24619a7d39a3d78eb8f70b7ccd2b0d5bc115b3b6b45a1849a9d2256a9f936f2085795798f72e094e2c08ea058fb8"' :
                                            'id="xs-controllers-links-module-DoctorModule-d2978478ffd2a6c41f8dfdda99665573543d24619a7d39a3d78eb8f70b7ccd2b0d5bc115b3b6b45a1849a9d2256a9f936f2085795798f72e094e2c08ea058fb8"' }>
                                            <li class="link">
                                                <a href="controllers/DoctorController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DoctorController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-DoctorModule-d2978478ffd2a6c41f8dfdda99665573543d24619a7d39a3d78eb8f70b7ccd2b0d5bc115b3b6b45a1849a9d2256a9f936f2085795798f72e094e2c08ea058fb8"' : 'data-bs-target="#xs-injectables-links-module-DoctorModule-d2978478ffd2a6c41f8dfdda99665573543d24619a7d39a3d78eb8f70b7ccd2b0d5bc115b3b6b45a1849a9d2256a9f936f2085795798f72e094e2c08ea058fb8"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-DoctorModule-d2978478ffd2a6c41f8dfdda99665573543d24619a7d39a3d78eb8f70b7ccd2b0d5bc115b3b6b45a1849a9d2256a9f936f2085795798f72e094e2c08ea058fb8"' :
                                        'id="xs-injectables-links-module-DoctorModule-d2978478ffd2a6c41f8dfdda99665573543d24619a7d39a3d78eb8f70b7ccd2b0d5bc115b3b6b45a1849a9d2256a9f936f2085795798f72e094e2c08ea058fb8"' }>
                                        <li class="link">
                                            <a href="injectables/DoctorService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DoctorService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/InvoiceModule.html" data-type="entity-link" >InvoiceModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-InvoiceModule-71181abc56cc65fadd0f258702debfba881612af9150db84a841e9ee86da1618c897bc60fcf34b25faaa95929e3d819667d8e7f29cebf14b822a0a13a330ecfc"' : 'data-bs-target="#xs-controllers-links-module-InvoiceModule-71181abc56cc65fadd0f258702debfba881612af9150db84a841e9ee86da1618c897bc60fcf34b25faaa95929e3d819667d8e7f29cebf14b822a0a13a330ecfc"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-InvoiceModule-71181abc56cc65fadd0f258702debfba881612af9150db84a841e9ee86da1618c897bc60fcf34b25faaa95929e3d819667d8e7f29cebf14b822a0a13a330ecfc"' :
                                            'id="xs-controllers-links-module-InvoiceModule-71181abc56cc65fadd0f258702debfba881612af9150db84a841e9ee86da1618c897bc60fcf34b25faaa95929e3d819667d8e7f29cebf14b822a0a13a330ecfc"' }>
                                            <li class="link">
                                                <a href="controllers/InvoiceController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InvoiceController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-InvoiceModule-71181abc56cc65fadd0f258702debfba881612af9150db84a841e9ee86da1618c897bc60fcf34b25faaa95929e3d819667d8e7f29cebf14b822a0a13a330ecfc"' : 'data-bs-target="#xs-injectables-links-module-InvoiceModule-71181abc56cc65fadd0f258702debfba881612af9150db84a841e9ee86da1618c897bc60fcf34b25faaa95929e3d819667d8e7f29cebf14b822a0a13a330ecfc"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-InvoiceModule-71181abc56cc65fadd0f258702debfba881612af9150db84a841e9ee86da1618c897bc60fcf34b25faaa95929e3d819667d8e7f29cebf14b822a0a13a330ecfc"' :
                                        'id="xs-injectables-links-module-InvoiceModule-71181abc56cc65fadd0f258702debfba881612af9150db84a841e9ee86da1618c897bc60fcf34b25faaa95929e3d819667d8e7f29cebf14b822a0a13a330ecfc"' }>
                                        <li class="link">
                                            <a href="injectables/InvoiceService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InvoiceService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MedicineModule.html" data-type="entity-link" >MedicineModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-MedicineModule-5ed2aa813961ee511c9669a16a9d48dc260d1558d172966a429e642a8c42904022bde14a03815c4e75443c0bab289c434efe81b2d825954691af4d0b6e41eca1"' : 'data-bs-target="#xs-controllers-links-module-MedicineModule-5ed2aa813961ee511c9669a16a9d48dc260d1558d172966a429e642a8c42904022bde14a03815c4e75443c0bab289c434efe81b2d825954691af4d0b6e41eca1"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-MedicineModule-5ed2aa813961ee511c9669a16a9d48dc260d1558d172966a429e642a8c42904022bde14a03815c4e75443c0bab289c434efe81b2d825954691af4d0b6e41eca1"' :
                                            'id="xs-controllers-links-module-MedicineModule-5ed2aa813961ee511c9669a16a9d48dc260d1558d172966a429e642a8c42904022bde14a03815c4e75443c0bab289c434efe81b2d825954691af4d0b6e41eca1"' }>
                                            <li class="link">
                                                <a href="controllers/MedicineController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MedicineController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MedicineModule-5ed2aa813961ee511c9669a16a9d48dc260d1558d172966a429e642a8c42904022bde14a03815c4e75443c0bab289c434efe81b2d825954691af4d0b6e41eca1"' : 'data-bs-target="#xs-injectables-links-module-MedicineModule-5ed2aa813961ee511c9669a16a9d48dc260d1558d172966a429e642a8c42904022bde14a03815c4e75443c0bab289c434efe81b2d825954691af4d0b6e41eca1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MedicineModule-5ed2aa813961ee511c9669a16a9d48dc260d1558d172966a429e642a8c42904022bde14a03815c4e75443c0bab289c434efe81b2d825954691af4d0b6e41eca1"' :
                                        'id="xs-injectables-links-module-MedicineModule-5ed2aa813961ee511c9669a16a9d48dc260d1558d172966a429e642a8c42904022bde14a03815c4e75443c0bab289c434efe81b2d825954691af4d0b6e41eca1"' }>
                                        <li class="link">
                                            <a href="injectables/MedicineService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MedicineService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/OfficeModule.html" data-type="entity-link" >OfficeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-OfficeModule-985f05d64a58056d5367019432c7e906cc69dab11e5d2fd9c9ffbc5b51ac96c2eae772418e3a3fb495eadb8c76eadd7d592d482b8022e5d16a7fb753a945eee2"' : 'data-bs-target="#xs-controllers-links-module-OfficeModule-985f05d64a58056d5367019432c7e906cc69dab11e5d2fd9c9ffbc5b51ac96c2eae772418e3a3fb495eadb8c76eadd7d592d482b8022e5d16a7fb753a945eee2"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-OfficeModule-985f05d64a58056d5367019432c7e906cc69dab11e5d2fd9c9ffbc5b51ac96c2eae772418e3a3fb495eadb8c76eadd7d592d482b8022e5d16a7fb753a945eee2"' :
                                            'id="xs-controllers-links-module-OfficeModule-985f05d64a58056d5367019432c7e906cc69dab11e5d2fd9c9ffbc5b51ac96c2eae772418e3a3fb495eadb8c76eadd7d592d482b8022e5d16a7fb753a945eee2"' }>
                                            <li class="link">
                                                <a href="controllers/OfficeController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OfficeController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-OfficeModule-985f05d64a58056d5367019432c7e906cc69dab11e5d2fd9c9ffbc5b51ac96c2eae772418e3a3fb495eadb8c76eadd7d592d482b8022e5d16a7fb753a945eee2"' : 'data-bs-target="#xs-injectables-links-module-OfficeModule-985f05d64a58056d5367019432c7e906cc69dab11e5d2fd9c9ffbc5b51ac96c2eae772418e3a3fb495eadb8c76eadd7d592d482b8022e5d16a7fb753a945eee2"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-OfficeModule-985f05d64a58056d5367019432c7e906cc69dab11e5d2fd9c9ffbc5b51ac96c2eae772418e3a3fb495eadb8c76eadd7d592d482b8022e5d16a7fb753a945eee2"' :
                                        'id="xs-injectables-links-module-OfficeModule-985f05d64a58056d5367019432c7e906cc69dab11e5d2fd9c9ffbc5b51ac96c2eae772418e3a3fb495eadb8c76eadd7d592d482b8022e5d16a7fb753a945eee2"' }>
                                        <li class="link">
                                            <a href="injectables/OfficeService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OfficeService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PatientModule.html" data-type="entity-link" >PatientModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PatientModule-10d34025cb233850c34a2ea4ecb6555b4e9f3b8449395e1cec3f89a68320122e18bc465d581d2e1672cbd28f1f37e8fbc21a3e30c38c20d2a48596f79b2480f1"' : 'data-bs-target="#xs-controllers-links-module-PatientModule-10d34025cb233850c34a2ea4ecb6555b4e9f3b8449395e1cec3f89a68320122e18bc465d581d2e1672cbd28f1f37e8fbc21a3e30c38c20d2a48596f79b2480f1"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PatientModule-10d34025cb233850c34a2ea4ecb6555b4e9f3b8449395e1cec3f89a68320122e18bc465d581d2e1672cbd28f1f37e8fbc21a3e30c38c20d2a48596f79b2480f1"' :
                                            'id="xs-controllers-links-module-PatientModule-10d34025cb233850c34a2ea4ecb6555b4e9f3b8449395e1cec3f89a68320122e18bc465d581d2e1672cbd28f1f37e8fbc21a3e30c38c20d2a48596f79b2480f1"' }>
                                            <li class="link">
                                                <a href="controllers/PatientController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PatientController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PatientModule-10d34025cb233850c34a2ea4ecb6555b4e9f3b8449395e1cec3f89a68320122e18bc465d581d2e1672cbd28f1f37e8fbc21a3e30c38c20d2a48596f79b2480f1"' : 'data-bs-target="#xs-injectables-links-module-PatientModule-10d34025cb233850c34a2ea4ecb6555b4e9f3b8449395e1cec3f89a68320122e18bc465d581d2e1672cbd28f1f37e8fbc21a3e30c38c20d2a48596f79b2480f1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PatientModule-10d34025cb233850c34a2ea4ecb6555b4e9f3b8449395e1cec3f89a68320122e18bc465d581d2e1672cbd28f1f37e8fbc21a3e30c38c20d2a48596f79b2480f1"' :
                                        'id="xs-injectables-links-module-PatientModule-10d34025cb233850c34a2ea4ecb6555b4e9f3b8449395e1cec3f89a68320122e18bc465d581d2e1672cbd28f1f37e8fbc21a3e30c38c20d2a48596f79b2480f1"' }>
                                        <li class="link">
                                            <a href="injectables/PatientService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PatientService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PersonModule.html" data-type="entity-link" >PersonModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PersonModule-ab784c69e84a334d336c3430edf566a5f5ae3adea02ac4fcfa7da3f61913e9f96d92bfb219d1f95f8a0dc18305a85eb4071af9401ee822f0ca09990493ac78dd"' : 'data-bs-target="#xs-controllers-links-module-PersonModule-ab784c69e84a334d336c3430edf566a5f5ae3adea02ac4fcfa7da3f61913e9f96d92bfb219d1f95f8a0dc18305a85eb4071af9401ee822f0ca09990493ac78dd"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PersonModule-ab784c69e84a334d336c3430edf566a5f5ae3adea02ac4fcfa7da3f61913e9f96d92bfb219d1f95f8a0dc18305a85eb4071af9401ee822f0ca09990493ac78dd"' :
                                            'id="xs-controllers-links-module-PersonModule-ab784c69e84a334d336c3430edf566a5f5ae3adea02ac4fcfa7da3f61913e9f96d92bfb219d1f95f8a0dc18305a85eb4071af9401ee822f0ca09990493ac78dd"' }>
                                            <li class="link">
                                                <a href="controllers/PersonController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PersonController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PersonModule-ab784c69e84a334d336c3430edf566a5f5ae3adea02ac4fcfa7da3f61913e9f96d92bfb219d1f95f8a0dc18305a85eb4071af9401ee822f0ca09990493ac78dd"' : 'data-bs-target="#xs-injectables-links-module-PersonModule-ab784c69e84a334d336c3430edf566a5f5ae3adea02ac4fcfa7da3f61913e9f96d92bfb219d1f95f8a0dc18305a85eb4071af9401ee822f0ca09990493ac78dd"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PersonModule-ab784c69e84a334d336c3430edf566a5f5ae3adea02ac4fcfa7da3f61913e9f96d92bfb219d1f95f8a0dc18305a85eb4071af9401ee822f0ca09990493ac78dd"' :
                                        'id="xs-injectables-links-module-PersonModule-ab784c69e84a334d336c3430edf566a5f5ae3adea02ac4fcfa7da3f61913e9f96d92bfb219d1f95f8a0dc18305a85eb4071af9401ee822f0ca09990493ac78dd"' }>
                                        <li class="link">
                                            <a href="injectables/PersonService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PersonService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PrescriptionDetailModule.html" data-type="entity-link" >PrescriptionDetailModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PrescriptionDetailModule-8acd715e8728d6f640b90c4b95e3d3eacf6a08d5437c6df463e9e9709f06cc3777d6f3915259c54716592ad1a7ae2196e59068980ef7809a02e1df930080186b"' : 'data-bs-target="#xs-controllers-links-module-PrescriptionDetailModule-8acd715e8728d6f640b90c4b95e3d3eacf6a08d5437c6df463e9e9709f06cc3777d6f3915259c54716592ad1a7ae2196e59068980ef7809a02e1df930080186b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PrescriptionDetailModule-8acd715e8728d6f640b90c4b95e3d3eacf6a08d5437c6df463e9e9709f06cc3777d6f3915259c54716592ad1a7ae2196e59068980ef7809a02e1df930080186b"' :
                                            'id="xs-controllers-links-module-PrescriptionDetailModule-8acd715e8728d6f640b90c4b95e3d3eacf6a08d5437c6df463e9e9709f06cc3777d6f3915259c54716592ad1a7ae2196e59068980ef7809a02e1df930080186b"' }>
                                            <li class="link">
                                                <a href="controllers/PrescriptionDetailController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrescriptionDetailController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PrescriptionDetailModule-8acd715e8728d6f640b90c4b95e3d3eacf6a08d5437c6df463e9e9709f06cc3777d6f3915259c54716592ad1a7ae2196e59068980ef7809a02e1df930080186b"' : 'data-bs-target="#xs-injectables-links-module-PrescriptionDetailModule-8acd715e8728d6f640b90c4b95e3d3eacf6a08d5437c6df463e9e9709f06cc3777d6f3915259c54716592ad1a7ae2196e59068980ef7809a02e1df930080186b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PrescriptionDetailModule-8acd715e8728d6f640b90c4b95e3d3eacf6a08d5437c6df463e9e9709f06cc3777d6f3915259c54716592ad1a7ae2196e59068980ef7809a02e1df930080186b"' :
                                        'id="xs-injectables-links-module-PrescriptionDetailModule-8acd715e8728d6f640b90c4b95e3d3eacf6a08d5437c6df463e9e9709f06cc3777d6f3915259c54716592ad1a7ae2196e59068980ef7809a02e1df930080186b"' }>
                                        <li class="link">
                                            <a href="injectables/PrescriptionDetailService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrescriptionDetailService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PrescriptionModule.html" data-type="entity-link" >PrescriptionModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PrescriptionModule-31b7a07bf406b98a719d37aa97e7882d0e9e627d69bd522617fe88f502e135ae5abf2d9258edc3be25a504e2e85593dea41ef4d7817142079074d3a1a1f13bb5"' : 'data-bs-target="#xs-controllers-links-module-PrescriptionModule-31b7a07bf406b98a719d37aa97e7882d0e9e627d69bd522617fe88f502e135ae5abf2d9258edc3be25a504e2e85593dea41ef4d7817142079074d3a1a1f13bb5"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PrescriptionModule-31b7a07bf406b98a719d37aa97e7882d0e9e627d69bd522617fe88f502e135ae5abf2d9258edc3be25a504e2e85593dea41ef4d7817142079074d3a1a1f13bb5"' :
                                            'id="xs-controllers-links-module-PrescriptionModule-31b7a07bf406b98a719d37aa97e7882d0e9e627d69bd522617fe88f502e135ae5abf2d9258edc3be25a504e2e85593dea41ef4d7817142079074d3a1a1f13bb5"' }>
                                            <li class="link">
                                                <a href="controllers/PrescriptionController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrescriptionController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PrescriptionModule-31b7a07bf406b98a719d37aa97e7882d0e9e627d69bd522617fe88f502e135ae5abf2d9258edc3be25a504e2e85593dea41ef4d7817142079074d3a1a1f13bb5"' : 'data-bs-target="#xs-injectables-links-module-PrescriptionModule-31b7a07bf406b98a719d37aa97e7882d0e9e627d69bd522617fe88f502e135ae5abf2d9258edc3be25a504e2e85593dea41ef4d7817142079074d3a1a1f13bb5"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PrescriptionModule-31b7a07bf406b98a719d37aa97e7882d0e9e627d69bd522617fe88f502e135ae5abf2d9258edc3be25a504e2e85593dea41ef4d7817142079074d3a1a1f13bb5"' :
                                        'id="xs-injectables-links-module-PrescriptionModule-31b7a07bf406b98a719d37aa97e7882d0e9e627d69bd522617fe88f502e135ae5abf2d9258edc3be25a504e2e85593dea41ef4d7817142079074d3a1a1f13bb5"' }>
                                        <li class="link">
                                            <a href="injectables/PrescriptionService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrescriptionService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SpecialtyModule.html" data-type="entity-link" >SpecialtyModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-SpecialtyModule-f701fc6bfe8195b2aff39c4826bc23a44cfa7fb5ea868a4c984e546a6b69d0fa54a46824a16ad99afafc2bb38d667cccf492f0f17629d5db88853aca4da3340f"' : 'data-bs-target="#xs-controllers-links-module-SpecialtyModule-f701fc6bfe8195b2aff39c4826bc23a44cfa7fb5ea868a4c984e546a6b69d0fa54a46824a16ad99afafc2bb38d667cccf492f0f17629d5db88853aca4da3340f"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SpecialtyModule-f701fc6bfe8195b2aff39c4826bc23a44cfa7fb5ea868a4c984e546a6b69d0fa54a46824a16ad99afafc2bb38d667cccf492f0f17629d5db88853aca4da3340f"' :
                                            'id="xs-controllers-links-module-SpecialtyModule-f701fc6bfe8195b2aff39c4826bc23a44cfa7fb5ea868a4c984e546a6b69d0fa54a46824a16ad99afafc2bb38d667cccf492f0f17629d5db88853aca4da3340f"' }>
                                            <li class="link">
                                                <a href="controllers/SpecialtyController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SpecialtyController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TemplatePlaygroundModule.html" data-type="entity-link" >TemplatePlaygroundModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-TemplatePlaygroundModule-8cc939e7dfa70de967fe5d681b2e5a071bccbfc7eb9cc59e05556be3afa34f8a1ff93b688740b89d44d59d0f3022398a7d1225bcbfa4049cad0b5f58e95b71ce"' : 'data-bs-target="#xs-components-links-module-TemplatePlaygroundModule-8cc939e7dfa70de967fe5d681b2e5a071bccbfc7eb9cc59e05556be3afa34f8a1ff93b688740b89d44d59d0f3022398a7d1225bcbfa4049cad0b5f58e95b71ce"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TemplatePlaygroundModule-8cc939e7dfa70de967fe5d681b2e5a071bccbfc7eb9cc59e05556be3afa34f8a1ff93b688740b89d44d59d0f3022398a7d1225bcbfa4049cad0b5f58e95b71ce"' :
                                            'id="xs-components-links-module-TemplatePlaygroundModule-8cc939e7dfa70de967fe5d681b2e5a071bccbfc7eb9cc59e05556be3afa34f8a1ff93b688740b89d44d59d0f3022398a7d1225bcbfa4049cad0b5f58e95b71ce"' }>
                                            <li class="link">
                                                <a href="components/TemplatePlaygroundComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TemplatePlaygroundComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-TemplatePlaygroundModule-8cc939e7dfa70de967fe5d681b2e5a071bccbfc7eb9cc59e05556be3afa34f8a1ff93b688740b89d44d59d0f3022398a7d1225bcbfa4049cad0b5f58e95b71ce"' : 'data-bs-target="#xs-injectables-links-module-TemplatePlaygroundModule-8cc939e7dfa70de967fe5d681b2e5a071bccbfc7eb9cc59e05556be3afa34f8a1ff93b688740b89d44d59d0f3022398a7d1225bcbfa4049cad0b5f58e95b71ce"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TemplatePlaygroundModule-8cc939e7dfa70de967fe5d681b2e5a071bccbfc7eb9cc59e05556be3afa34f8a1ff93b688740b89d44d59d0f3022398a7d1225bcbfa4049cad0b5f58e95b71ce"' :
                                        'id="xs-injectables-links-module-TemplatePlaygroundModule-8cc939e7dfa70de967fe5d681b2e5a071bccbfc7eb9cc59e05556be3afa34f8a1ff93b688740b89d44d59d0f3022398a7d1225bcbfa4049cad0b5f58e95b71ce"' }>
                                        <li class="link">
                                            <a href="injectables/HbsRenderService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HbsRenderService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TemplateEditorService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TemplateEditorService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ZipExportService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ZipExportService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AppointmentController.html" data-type="entity-link" >AppointmentController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/DoctorController.html" data-type="entity-link" >DoctorController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/InvoiceController.html" data-type="entity-link" >InvoiceController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/MedicineController.html" data-type="entity-link" >MedicineController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/OfficeController.html" data-type="entity-link" >OfficeController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PatientController.html" data-type="entity-link" >PatientController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PersonController.html" data-type="entity-link" >PersonController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PrescriptionController.html" data-type="entity-link" >PrescriptionController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PrescriptionDetailController.html" data-type="entity-link" >PrescriptionDetailController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/SpecialtyController.html" data-type="entity-link" >SpecialtyController</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/Appointment.html" data-type="entity-link" >Appointment</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Doctor.html" data-type="entity-link" >Doctor</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Invoice.html" data-type="entity-link" >Invoice</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Medicine.html" data-type="entity-link" >Medicine</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Office.html" data-type="entity-link" >Office</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Patient.html" data-type="entity-link" >Patient</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Person.html" data-type="entity-link" >Person</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Prescription.html" data-type="entity-link" >Prescription</a>
                                </li>
                                <li class="link">
                                    <a href="entities/PrescriptionDetail.html" data-type="entity-link" >PrescriptionDetail</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Specialty.html" data-type="entity-link" >Specialty</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Auth.html" data-type="entity-link" >Auth</a>
                            </li>
                            <li class="link">
                                <a href="classes/BaseDocumentation.html" data-type="entity-link" >BaseDocumentation</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateAppointmentDto.html" data-type="entity-link" >CreateAppointmentDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateDoctorDto.html" data-type="entity-link" >CreateDoctorDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateInvoiceDto.html" data-type="entity-link" >CreateInvoiceDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateMedicineDto.html" data-type="entity-link" >CreateMedicineDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateOfficeDto.html" data-type="entity-link" >CreateOfficeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePatientDto.html" data-type="entity-link" >CreatePatientDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePersonDto.html" data-type="entity-link" >CreatePersonDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePrescriptionDetailDto.html" data-type="entity-link" >CreatePrescriptionDetailDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePrescriptionDto.html" data-type="entity-link" >CreatePrescriptionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateSpecialtyDto.html" data-type="entity-link" >CreateSpecialtyDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginDto.html" data-type="entity-link" >LoginDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegisterDto.html" data-type="entity-link" >RegisterDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SpecialtyService.html" data-type="entity-link" >SpecialtyService</a>
                            </li>
                            <li class="link">
                                <a href="classes/SwaggerDocumentation.html" data-type="entity-link" >SwaggerDocumentation</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateAppointmentDto.html" data-type="entity-link" >UpdateAppointmentDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateDoctorDto.html" data-type="entity-link" >UpdateDoctorDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateInvoiceDto.html" data-type="entity-link" >UpdateInvoiceDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateMedicineDto.html" data-type="entity-link" >UpdateMedicineDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateOfficeDto.html" data-type="entity-link" >UpdateOfficeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePatientDto.html" data-type="entity-link" >UpdatePatientDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePersonDto.html" data-type="entity-link" >UpdatePersonDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePrescriptionDetailsDto.html" data-type="entity-link" >UpdatePrescriptionDetailsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePrescriptionDto.html" data-type="entity-link" >UpdatePrescriptionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateSpecialtyDto.html" data-type="entity-link" >UpdateSpecialtyDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppointmentService.html" data-type="entity-link" >AppointmentService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DoctorService.html" data-type="entity-link" >DoctorService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HbsRenderService.html" data-type="entity-link" >HbsRenderService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/InvoiceService.html" data-type="entity-link" >InvoiceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtStrategy.html" data-type="entity-link" >JwtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MedicineService.html" data-type="entity-link" >MedicineService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OfficeService.html" data-type="entity-link" >OfficeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PatientService.html" data-type="entity-link" >PatientService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PersonService.html" data-type="entity-link" >PersonService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PrescriptionDetailService.html" data-type="entity-link" >PrescriptionDetailService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PrescriptionService.html" data-type="entity-link" >PrescriptionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TemplateEditorService.html" data-type="entity-link" >TemplateEditorService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ZipExportService.html" data-type="entity-link" >ZipExportService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/RolesGuard.html" data-type="entity-link" >RolesGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/CompoDocConfig.html" data-type="entity-link" >CompoDocConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IDocumentation.html" data-type="entity-link" >IDocumentation</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/JwtPayload.html" data-type="entity-link" >JwtPayload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Session.html" data-type="entity-link" >Session</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Template.html" data-type="entity-link" >Template</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});