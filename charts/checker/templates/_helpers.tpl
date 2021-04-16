{{/* vim: set filetype=mustache: */}}
{{/*
Expand the name of the chart.
*/}}
{{- define "upbots.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "upbots.fullname" -}}
{{- if .Values.fullnameOverride -}}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- $name := default .Chart.Name .Values.nameOverride -}}
{{- if contains $name .Release.Name -}}
{{- .Release.Name | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" -}}
{{- end -}}
{{- end -}}
{{- end -}}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "upbots.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" -}}
{{- end -}}


{{/*
Define front domain.
*/}}
{{- define "upbots.frontDomain" -}}
{{- if .Values.front.subDomain -}}
{{- printf "%s.%s" .Values.front.subDomain .Values.domain -}}
{{- else -}}
{{- printf "%s" .Values.domain -}}
{{- end -}}
{{- end -}}


{{/*
Define front url.
*/}}
{{- define "upbots.frontUrl" -}}
{{- if .Values.front.subDomain -}}
{{- printf "https://%s.%s" .Values.front.subDomain .Values.domain -}}
{{- else -}}
{{- printf "https://%s" .Values.domain -}}
{{- end -}}
{{- end -}}

{{/*
Define api url.
*/}}
{{- define "upbots.apiUrl" -}}
{{- printf "https://%s.%s" .Values.api.subDomain .Values.domain -}}
{{- end -}}
