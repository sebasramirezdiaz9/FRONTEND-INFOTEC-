<template>
    <modal name="image-modal" height="auto" @before-open="beforeOpen" >
        <div class="box">
            <div class="border-bottom p-3 modal-header">
                Añadir nueva imagen
            </div>
            <div class="p-3 flex-col">
                <alv-form action="http://127.0.0.1:8000/api/images" id="image-create" method="POST" :spinner="true"
                          :data-object="image" @after-done="afterDone" ref="form">
                    <div class="row">
                        <div class="mb-3 col-md-12">
                            <div class="form-group">
                                <label class="w-100 text-start" for="name">Nombre</label>
                                <input v-model="image.name" type="text" class="form-control" name="name">
                            </div>
                        </div>
                        <div class="mb-3 col-md-12">
                            <div class="form-group">
                               <label class="w-100 text-start" for="name">Fecha</label>
                                  <flat-pickr v-model="image.date" name="date" class="form-control"></flat-pickr>
                            </div>
                        </div>
                         <div class="mb-3 col-md-12">
                            <div class="form-group">
                               <label class="w-100 text-start" for="name">Imagen</label>
                                  <VueFileAgent
                                    ref="vueFileAgent"
                                    :theme="'list'"
                                    :multiple="true"
                                    :deletable="true"
                                    :meta="true"
                                    :accept="'image/*'"
                                    maxSize="1MB"
                                    :maxFiles="1"
                                    helpText="Carga tus imágenes aqui"
                                    :errorText="{
                                                type: 'Tipo de archivo invalido. Solo las imágenes estan permitidas',
                                                size: 'Las imágenes no pueden exceder el 1mb',
                                                }"
                                    @select="filesSelected($event)"
                                    @beforedelete="onBeforeDelete($event)"
                                    @delete="fileDeleted($event)"
                                    v-model="image.image_url"
                                ></VueFileAgent>
                            </div>
                        </div>
                    </div>
                </alv-form>
            </div>
            <div class="p-3 text-end">
                <button type="submit" class="btn btn-primary" form="image-create">Guardar</button>
            </div>
        </div>
    </modal>
</template>

<script>
import Swal from 'sweetalert2';
export default {
    name: "CreateImage",
    data() {
        return {
            image: {
              name: "",
              date: "",
              image_url:""
            },
        }
    },
    methods: {
        afterDone() {
            this.$modal.hide("image-modal");
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Your image has been saved',
              showConfirmButton: false,
              timer: 1500
            });
            this.$emit('reload');
        },
        beforeOpen() {
            this.image = {
              name : "",
              date: "",
              image_url:""
            }
        },
        filesSelected: function (fileRecordsNewlySelected) {
            var validFileRecords = fileRecordsNewlySelected.filter(
                (fileRecord) => !fileRecord.error
            );
            this.fileRecordsForUpload =
                this.fileRecordsForUpload.concat(validFileRecords);
        },
        onBeforeDelete: function (fileRecord) {
            var i = this.fileRecordsForUpload.indexOf(fileRecord);
            if (i !== -1) {
                // queued file, not yet uploaded. Just remove from the arrays
                this.fileRecordsForUpload.splice(i, 1);
                var k = this.fileRecords.indexOf(fileRecord);
                if (k !== -1) this.fileRecords.splice(k, 1);
            } else {
                if (confirm("Are you sure you want to delete?")) {
                    this.$refs.vueFileAgent.deleteFileRecord(fileRecord); // will trigger 'delete' event
                }
            }
        },
        fileDeleted: function (fileRecord) {
            var i = this.fileRecordsForUpload.indexOf(fileRecord);
            if (i !== -1) {
                this.fileRecordsForUpload.splice(i, 1);
            } else {
                this.deleteUploadedFile(fileRecord);
            }
        },

    }
}
</script>
<style scoped>
.modal-header{
  background: rgb(0, 48, 78);
  color:white;
}
</style>

