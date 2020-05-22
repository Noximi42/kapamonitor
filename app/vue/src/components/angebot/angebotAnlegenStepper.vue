<template>
  <v-stepper v-model="e6" vertical>
    <v-stepper-step :complete="e6 > 1" step="1" :editable="e6 > 1">
      Welche Ressource wollen sie anbieten?
      <small> Bitte geben Sie die Art der Ressource, Menge, Stückpreis und Zertifikate an.</small>
    </v-stepper-step>

    <v-stepper-content step="1">
      <!-- <v-card outlined class="mb-12"> -->
      <!-- <v-card-text> -->
      <v-form
        ref="stepper1"
        v-model="stepper1Valid"
      >
        <v-select
          v-model="product"
          :items="resourcesDropdown"
          :rules="[v => !!v || 'Bitte geben Sie die benötigte Ressource an']"
          label="Ressource"
          required
        />

        <v-text-field
          v-model="menge"
          :rules="mengeRules"
          label="Menge"
          type="number"
          required
        />

        <v-text-field
          v-model="price"
          :rules="priceRules"
          :label="priceLabel"
          type="number"
          required
        />

        <!-- <v-checkbox
          v-model="checkbox"
          :rules="[v => !!v || 'You must agree to continue!']"
          label="Do you agree?"
          required
        /> -->

        <!-- <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="validate"
        >
          Validate
        </v-btn>

        <v-btn
          color="error"
          class="mr-4"
          @click="reset"
        >
          Reset Form
        </v-btn>

        <v-btn
          color="warning"
          @click="resetValidation"
        >
          Reset Validation
        </v-btn> -->
        <v-combobox
          ref="combobox"
          v-model="selectedZertifikate"
          :items="possibleCertificates"
          label="Zertifikate"
          multiple
          chips
          :rules="[v => !!(v.length > 0) || 'Bitte geben Sie die Zertifikate der Ressource an.']"
        >
          <template v-slot:selection="data">
            <v-chip
              :key="JSON.stringify(data.item)"
              v-bind="data.attrs"
              :input-value="data.selected"
              :disabled="data.disabled"
              @click:close="data.parent.selectItem(data.item)"
            >
              <v-avatar
                class="accent white--text"
                left
                v-text="data.item.text.slice(0, 1).toUpperCase()"
              />
              {{ data.item.text }}
            </v-chip>
          </template>
        </v-combobox>
      </v-form>
      <!-- </v-card-text> -->
      <!-- </v-card> -->
      <v-btn color="primary" @click="validateStep1">
        Weiter
      </v-btn>
      <v-btn text @click="reset">
        Abbrechen
      </v-btn>
    </v-stepper-content>

    <v-stepper-step :complete="e6 > 2" step="2" :editable="e6 > 2">
      Ergänzende Informationen zu ihrem Angebot
    </v-stepper-step>

    <v-stepper-content step="2">
      <v-form
        ref="stepper2"
      >
        <v-textarea
          v-model="description"
          label="Beschreibung"
          clearable
          rounded
          placeholder="Hier können Sie weitere Details zu ihrem Angebot platzieren."
        />
      </v-form>
      <v-btn color="primary" @click="e6 = 3">
        Weiter
      </v-btn>
      <v-btn text @click="reset">
        Abbrechen
      </v-btn>
    </v-stepper-content>

    <v-stepper-step :complete="e6 > 3" step="3">
      Kontaktinformatonen
    </v-stepper-step>

    <v-stepper-content step="3">
      <!-- <v-card color="grey lighten-1" class="mb-12" height="200px" /> -->
      <v-form
        ref="stepper3"
        v-model="stepper3Valid"
      >
        <v-checkbox
          v-model="checkbox"
          :rules="[v => !!v || 'Bitte akzeptieren Sie unsere AGB.']"
          label="Ich akzeptiere die AGB"
          required
        />
      </v-form>
      <v-btn color="primary" @click="validateStep3">
        Abschicken
      </v-btn>
      <v-btn text @click="reset">
        Abbrechen
      </v-btn>
    </v-stepper-content>
  </v-stepper>
</template>

<script>
export default {
  props: {
    resources: {
      type: Array,
      default: () => []
    },
    resourcesDropdown: {
      type: Array,
      default: () => []
    },
    certificates: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      stepper1Valid: false,
      stepper3Valid: false,
      menge: 0,
      mengeRules: [
        v => !!v || 'Bitte geben Sie eine Menge an.',
        v => (v > 0) || 'Die Menge muss größer als 0 sein.'
      ],
      price: '',
      priceRules: [
        v => !!v || 'Ein Preis pro Mengeneinheit ist erforderlich.',
        v => (v > 0) || 'Die Preis muss größer oder gleich 0 sein.'
      ],
      product: null,
      description: '',
      checkbox: false,
      selectedZertifikate: [],
      e6: 1
    }
  },
  computed: {
    priceLabel () {
      return (this.product) ? 'Preis pro Mengeneinheit (' + this.resources.filter((item) => { return item.id === this.product })[0].unitOfMeasure + ')' : 'Preis pro Mengeneinheit'
    },
    possibleCertificates () {
      return (this.product) ? this.certificates.filter((item) => { return item.resourceId === this.product }) : this.certificates
    }
  },
  watch: {
    product (newResource, oldResource) {
      if (oldResource != null) {
        this.selectedZertifikate = []
        this.$refs.combobox.lazySearch = ''
      }
    }
  },
  methods: {
    validateStep1 () {
      this.$refs.stepper1.validate()
      if (this.stepper1Valid) {
        this.e6 = ++this.e6
      }
    },
    validateStep3 () {
      this.$refs.stepper3.validate()
      if (this.stepper3Valid) {
        this.e6 = 1
        const selectedZertifikateIds = this.selectedZertifikate.map(item => item.value)
        this.$api.postOffer({
          contactInfoId: 1,
          locationId: 1,
          resourceId: this.product,
          certificateIds: selectedZertifikateIds,
          number: Number(this.menge),
          price: Number(this.price),
          description: this.description
        })
      }
    },
    reset () {
      this.$refs.stepper1.reset()
      this.$refs.stepper2.reset()
      this.e6 = 1
    },
    resetValidation () {
      this.$refs.stepper1.resetValidation()
    }
  }
}
</script>

<style>

</style>
